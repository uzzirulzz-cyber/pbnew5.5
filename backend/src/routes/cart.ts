import express from "express";
import { prisma } from "../config/prisma";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.get("/", authenticate, async (req: any, res, next) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: {
        product: {
          include: {
            category: { select: { name: true } },
            images: { take: 1 },
          },
        },
      },
    });

    const total = cartItems.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0);

    res.json({ success: true, data: { items: cartItems, total } });
  } catch (err) {
    next(err);
  }
});

router.post("/", authenticate, async (req: any, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const existing = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId: req.user.id, productId } },
    });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
        include: { product: { include: { images: { take: 1 } } } },
      });
      return res.json({ success: true, data: updated });
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        userId: req.user.id,
        productId,
        quantity,
      },
      include: {
        product: {
          include: {
            category: { select: { name: true } },
            images: { take: 1 },
          },
        },
      },
    });

    res.status(201).json({ success: true, data: cartItem });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", authenticate, async (req: any, res, next) => {
  try {
    const { quantity } = req.body;

    const cartItem = await prisma.cartItem.updateMany({
      where: { id: req.params.id, userId: req.user.id },
      data: { quantity },
    });

    res.json({ success: true, data: cartItem });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authenticate, async (req: any, res, next) => {
  try {
    await prisma.cartItem.deleteMany({
      where: { id: req.params.id, userId: req.user.id },
    });

    res.json({ success: true, message: "Item removed from cart" });
  } catch (err) {
    next(err);
  }
});

router.delete("/", authenticate, async (req: any, res, next) => {
  try {
    await prisma.cartItem.deleteMany({
      where: { userId: req.user.id },
    });

    res.json({ success: true, message: "Cart cleared" });
  } catch (err) {
    next(err);
  }
});

export default router;
