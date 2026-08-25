import express from "express";
import { prisma } from "../config/prisma";
import { AppError } from "../middleware/errorHandler";
import { authenticate, authorize } from "../middleware/auth";
import { cacheGet, cacheSet, cacheDelete } from "../config/redis";

const router = express.Router();

// List products with filters
router.get("/", async (req, res, next) => {
  try {
    const cacheKey = `products:${JSON.stringify(req.query)}`;
    const cached = await cacheGet(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const {
      page = "1",
      limit = "20",
      category,
      search,
      minPrice,
      maxPrice,
      sort = "createdAt",
      order = "desc",
      featured,
      trending,
      sale,
      vendor,
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: any = {
      isActive: true,
      status: "ACTIVE",
    };

    if (category) {
      where.category = { slug: category as string };
    }
    if (featured === "true") where.isFeatured = true;
    if (trending === "true") where.isTrending = true;
    if (sale === "true") where.isOnSale = true;
    if (vendor) where.vendorId = vendor as string;
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: "insensitive" } },
        { description: { contains: search as string, mode: "insensitive" } },
        { tags: { has: search as string } },
      ];
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    const orderBy: any = {};
    orderBy[sort as string] = order;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          category: { select: { name: true, slug: true, color: true } },
          subcategory: { select: { name: true, slug: true } },
          vendor: { select: { id: true, name: true, avatar: true } },
          images: { orderBy: { sortOrder: "asc" } },
          _count: { select: { reviews: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    const result = {
      success: true,
      data: products,
      pagination: {
        page: Number(page),
        limit: take,
        total,
        pages: Math.ceil(total / take),
      },
    };

    await cacheSet(cacheKey, JSON.stringify(result), 300);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Get single product by slug
router.get("/:slug", async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug, isActive: true },
      include: {
        category: true,
        subcategory: true,
        vendor: {
          select: { id: true, name: true, avatar: true, createdAt: true },
        },
        images: { orderBy: { sortOrder: "asc" } },
        reviews: {
          take: 10,
          orderBy: { createdAt: "desc" },
          include: {
            user: { select: { id: true, name: true, avatar: true } },
          },
        },
        licenseKeys: {
          where: { isUsed: false },
          take: 5,
          select: { id: true },
        },
      },
    });

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    // Increment view count
    await prisma.product.update({
      where: { id: product.id },
      data: { viewCount: { increment: 1 } },
    });

    // Get related products
    const related = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
        isActive: true,
      },
      take: 4,
      include: {
        category: { select: { name: true, slug: true } },
        images: { take: 1 },
      },
    });

    res.json({ success: true, data: { ...product, related } });
  } catch (err) {
    next(err);
  }
});

// Create product (vendor/admin only)
router.post(
  "/",
  authenticate,
  authorize("VENDOR", "ADMIN", "SUPERADMIN"),
  async (req: any, res, next) => {
    try {
      const product = await prisma.product.create({
        data: {
          ...req.body,
          vendorId: req.user.id,
          price: Number(req.body.price),
          originalPrice: req.body.originalPrice ? Number(req.body.originalPrice) : undefined,
          stock: Number(req.body.stock) || 0,
        },
        include: {
          category: true,
          images: true,
        },
      });

      await cacheDelete("products:*");
      res.status(201).json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
  }
);

// Update product
router.patch(
  "/:id",
  authenticate,
  authorize("VENDOR", "ADMIN", "SUPERADMIN"),
  async (req: any, res, next) => {
    try {
      const existing = await prisma.product.findUnique({
        where: { id: req.params.id },
        select: { vendorId: true },
      });

      if (!existing) {
        throw new AppError("Product not found", 404);
      }

      // Vendors can only edit their own products
      if (req.user.role === "VENDOR" && existing.vendorId !== req.user.id) {
        throw new AppError("Not authorized to edit this product", 403);
      }

      const product = await prisma.product.update({
        where: { id: req.params.id },
        data: {
          ...req.body,
          price: req.body.price ? Number(req.body.price) : undefined,
          originalPrice: req.body.originalPrice ? Number(req.body.originalPrice) : undefined,
          stock: req.body.stock ? Number(req.body.stock) : undefined,
        },
        include: {
          category: true,
          images: true,
        },
      });

      await cacheDelete("products:*");
      res.json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
  }
);

// Delete product
router.delete(
  "/:id",
  authenticate,
  authorize("VENDOR", "ADMIN", "SUPERADMIN"),
  async (req: any, res, next) => {
    try {
      const existing = await prisma.product.findUnique({
        where: { id: req.params.id },
        select: { vendorId: true },
      });

      if (!existing) {
        throw new AppError("Product not found", 404);
      }

      if (req.user.role === "VENDOR" && existing.vendorId !== req.user.id) {
        throw new AppError("Not authorized", 403);
      }

      await prisma.product.delete({ where: { id: req.params.id } });
      await cacheDelete("products:*");

      res.json({ success: true, message: "Product deleted" });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
