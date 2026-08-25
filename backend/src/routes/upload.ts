import express from "express";
const router = express.Router();
router.post("/", (req, res) => res.json({ success: true, url: "https://cdn.playbeat.digital/upload.jpg" }));
export default router;
