import express from "express";
import { prisma } from "../config/prisma";
const router = express.Router();

router.get("/validate/:code", async (req, res, next) => {
  try {
    const coupon = await prisma.coupon.findUnique({ where: { code: req.params.code } });
    if (!coupon || !coupon.isActive) {
      return res.status(404).json({ success: false, message: "Invalid coupon" });
    }
    res.json({ success: true, data: coupon });
  } catch (err) { next(err); }
});

export default router;
