import express from "express";
import { prisma } from "../config/prisma";
const router = express.Router();

router.get("/pages/:slug", async (req, res, next) => {
  try {
    const page = await prisma.page.findUnique({ where: { slug: req.params.slug } });
    if (!page) return res.status(404).json({ success: false, message: "Page not found" });
    res.json({ success: true, data: page });
  } catch (err) { next(err); }
});

export default router;
