import express from "express";
import { prisma } from "../config/prisma";
import { authenticate } from "../middleware/auth";
const router = express.Router();

router.get("/profile", authenticate, async (req: any, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true, email: true, name: true, avatar: true, phone: true,
      role: true, walletBalance: true, walletCurrency: true,
      referralCode: true, kycVerified: true, createdAt: true,
    },
  });
  res.json({ success: true, data: user });
});

export default router;
