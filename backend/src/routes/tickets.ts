import express from "express";
import { prisma } from "../config/prisma";
import { authenticate } from "../middleware/auth";
const router = express.Router();

router.get("/", authenticate, async (req: any, res) => {
  const tickets = await prisma.ticket.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
  });
  res.json({ success: true, data: tickets });
});

export default router;
