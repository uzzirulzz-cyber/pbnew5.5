import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import { prisma } from "../config/prisma";
import { AppError } from "../middleware/errorHandler";
import { authenticate } from "../middleware/auth";
import { cacheSet } from "../config/redis";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "playbeat-secret";
const JWT_EXPIRE = "7d";
const JWT_REFRESH_EXPIRE = "30d";

const generateToken = (userId: string, type: "access" | "refresh" = "access") => {
  return jwt.sign(
    { id: userId, type },
    type === "refresh" ? process.env.JWT_REFRESH_SECRET || JWT_SECRET : JWT_SECRET,
    { expiresIn: type === "refresh" ? JWT_REFRESH_EXPIRE : JWT_EXPIRE }
  );
};

// Register
router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("name").trim().isLength({ min: 2 }).withMessage("Name is required"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new AppError(errors.array()[0].msg, 400);
      }

      const { email, password, name, referralCode } = req.body;

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        throw new AppError("Email already registered", 409);
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newReferralCode = Math.random().toString(36).substring(2, 10).toUpperCase();

      // Handle referral
      let referredBy = null;
      if (referralCode) {
        const referrer = await prisma.user.findUnique({
          where: { referralCode },
          select: { id: true },
        });
        if (referrer) referredBy = referrer.id;
      }

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          referralCode: newReferralCode,
          referredBy,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          walletBalance: true,
          walletCurrency: true,
          avatar: true,
        },
      });

      const token = generateToken(user.id);
      const refreshToken = generateToken(user.id, "refresh");

      await cacheSet(`token:${user.id}`, token, 604800);

      res.status(201).json({
        success: true,
        message: "Account created successfully",
        token,
        refreshToken,
        user,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").exists().withMessage("Password is required"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new AppError(errors.array()[0].msg, 400);
      }

      const { email, password, twoFactorCode } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          password: true,
          role: true,
          status: true,
          walletBalance: true,
          walletCurrency: true,
          avatar: true,
          twoFactorEnabled: true,
          twoFactorSecret: true,
        },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AppError("Invalid email or password", 401);
      }

      if (user.status === "BANNED") {
        throw new AppError("Account has been suspended. Contact support.", 403);
      }

      // 2FA verification
      if (user.twoFactorEnabled && user.twoFactorSecret) {
        if (!twoFactorCode) {
          throw new AppError("2FA code required", 401);
        }
        const verified = speakeasy.totp.verify({
          secret: user.twoFactorSecret,
          encoding: "base32",
          token: twoFactorCode,
          window: 1,
        });
        if (!verified) {
          throw new AppError("Invalid 2FA code", 401);
        }
      }

      // Log login history
      await prisma.loginHistory.create({
        data: {
          userId: user.id,
          ip: req.ip || "unknown",
          userAgent: req.get("user-agent") || "unknown",
          success: true,
        },
      });

      const token = generateToken(user.id);
      const refreshToken = generateToken(user.id, "refresh");

      await cacheSet(`token:${user.id}`, token, 604800);

      const { password: _, twoFactorSecret: __, ...userData } = user;

      res.json({
        success: true,
        message: "Login successful",
        token,
        refreshToken,
        user: userData,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Get current user
router.get("/me", authenticate, async (req: any, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        status: true,
        walletBalance: true,
        walletCurrency: true,
        emailVerified: true,
        twoFactorEnabled: true,
        referralCode: true,
        referralEarnings: true,
        kycVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
});

// Refresh token
router.post("/refresh", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new AppError("Refresh token required", 400);
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || JWT_SECRET) as any;
    if (decoded.type !== "refresh") {
      throw new AppError("Invalid refresh token", 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, status: true },
    });

    if (!user || user.status === "BANNED") {
      throw new AppError("Invalid token", 401);
    }

    const newToken = generateToken(user.id);
    const newRefreshToken = generateToken(user.id, "refresh");

    await cacheSet(`token:${user.id}`, newToken, 604800);

    res.json({
      success: true,
      token: newToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(new AppError("Invalid refresh token", 401));
  }
});

// Setup 2FA
router.post("/2fa/setup", authenticate, async (req: any, res, next) => {
  try {
    const secret = speakeasy.generateSecret({
      name: `PlayBeat Digital (${req.user.email})`,
      issuer: "PlayBeat Digital",
    });

    await prisma.user.update({
      where: { id: req.user.id },
      data: { twoFactorSecret: secret.base32 },
    });

    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url || "");

    res.json({
      success: true,
      secret: secret.base32,
      qrCode: qrCodeUrl,
    });
  } catch (err) {
    next(err);
  }
});

// Verify and enable 2FA
router.post("/2fa/verify", authenticate, async (req: any, res, next) => {
  try {
    const { code } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { twoFactorSecret: true },
    });

    if (!user?.twoFactorSecret) {
      throw new AppError("2FA not set up", 400);
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token: code,
      window: 1,
    });

    if (!verified) {
      throw new AppError("Invalid 2FA code", 400);
    }

    await prisma.user.update({
      where: { id: req.user.id },
      data: { twoFactorEnabled: true },
    });

    res.json({ success: true, message: "2FA enabled successfully" });
  } catch (err) {
    next(err);
  }
});

// Logout
router.post("/logout", authenticate, async (req: any, res, next) => {
  try {
    // In a real app, you might blacklist the token in Redis
    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
