import express from "express";
import { prisma } from "../config/prisma";
import { authenticate } from "../middleware/auth";
const router = express.Router();

router.get("/", authenticate, async (req: any, res) => {
  const transactions = await prisma.transaction.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  res.json({ success: true, data: { balance: req.user.walletBalance, currency: req.user.walletCurrency, transactions } });
});

export default router;
