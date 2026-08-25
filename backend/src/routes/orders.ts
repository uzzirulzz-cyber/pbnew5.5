import express from "express";
import { prisma } from "../config/prisma";
import { authenticate } from "../middleware/auth";
import { AppError } from "../middleware/errorHandler";

const router = express.Router();

// Create order
router.post("/", authenticate, async (req: any, res, next) => {
  try {
    const { items, total, subtotal, tax, discount, paymentMethod, billingAddress, notes, couponCode } = req.body;

    const orderNumber = `PB-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Create order with items
    const order = await prisma.$transaction(async (tx) => {
      // Check stock and create order items
      const orderItems = [];
      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
          select: { id: true, name: true, price: true, stock: true, deliveryType: true, licenseType: true },
        });

        if (!product) throw new AppError(`Product ${item.productId} not found`, 404);
        if (product.stock < item.quantity) throw new AppError(`Insufficient stock for ${product.name}`, 400);

        // Deduct stock
        await tx.product.update({
          where: { id: product.id },
          data: { stock: { decrement: item.quantity }, salesCount: { increment: item.quantity } },
        });

        orderItems.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
        });
      }

      // Create order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: req.user.id,
          subtotal,
          tax: tax || 0,
          discount: discount || 0,
          total,
          paymentMethod,
          billingAddress,
          notes,
          couponCode,
          items: {
            create: orderItems,
          },
        },
        include: {
          items: { include: { product: { select: { slug: true, images: { take: 1 } } } } },
        },
      });

      return newOrder;
    });

    // Emit real-time update
    const io = req.app.get("io");
    io.to(`user-${req.user.id}`).emit("order-created", order);
    io.to("admin-room").emit("new-order", order);

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});

// Get user orders
router.get("/my-orders", authenticate, async (req: any, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: { select: { slug: true, images: { take: 1 } } },
          },
        },
      },
    });
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
});

// Get single order
router.get("/:id", authenticate, async (req: any, res, next) => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
      include: {
        items: {
          include: {
            product: { select: { slug: true, images: { take: 1 } } },
          },
        },
        user: { select: { name: true, email: true } },
      },
    });

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});

export default router;
