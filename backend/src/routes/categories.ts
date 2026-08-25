import express from "express";
import { prisma } from "../config/prisma";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: {
        subcategories: { orderBy: { name: "asc" } },
        _count: { select: { products: true } },
      },
    });

    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: req.params.slug },
      include: {
        subcategories: true,
        products: {
          where: { isActive: true },
          take: 20,
          include: {
            images: { take: 1 },
            vendor: { select: { name: true } },
          },
        },
      },
    });

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
});

export default router;
