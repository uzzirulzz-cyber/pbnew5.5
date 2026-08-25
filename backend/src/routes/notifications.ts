import express from "express";
import { prisma } from "../config/prisma";
import { authenticate } from "../middleware/auth";
const router = express.Router();

router.get("/", authenticate, async (req: any, res) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  res.json({ success: true, data: notifications });
});

export default router;
