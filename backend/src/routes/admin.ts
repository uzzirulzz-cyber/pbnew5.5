import express from "express";
import { authenticate, authorize } from "../middleware/auth";
import { prisma } from "../config/prisma";
const router = express.Router();

router.use(authenticate, authorize("ADMIN", "SUPERADMIN"));

router.get("/dashboard", async (req, res) => {
  const [totalUsers, totalOrders, totalProducts, totalRevenue] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.product.count(),
    prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: "COMPLETED" } }),
  ]);

  res.json({
    success: true,
    data: {
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue: totalRevenue._sum.total || 0,
    },
  });
});

router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true, email: true, name: true, role: true, status: true,
      walletBalance: true, createdAt: true,
    },
  });
  res.json({ success: true, data: users });
});

export default router;
