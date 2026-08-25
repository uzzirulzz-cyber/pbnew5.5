import express from "express";
import { prisma } from "../config/prisma";
import { authenticate } from "../middleware/auth";
const router = express.Router();

router.get("/", authenticate, async (req: any, res) => {
  const subs = await prisma.subscription.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
  });
  res.json({ success: true, data: subs });
});

export default router;
