import express from "express";
import { prisma } from "../config/prisma";
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    take: 20,
  });
  res.json({ success: true, data: posts });
});

export default router;
