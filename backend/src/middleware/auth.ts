import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { AppError } from "./errorHandler";

interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new AppError("Access denied. No token provided.", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "playbeat-secret") as any;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        status: true,
        walletBalance: true,
        walletCurrency: true,
        twoFactorEnabled: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new AppError("User not found.", 401);
    }

    if (user.status === "BANNED") {
      throw new AppError("Account has been suspended.", 403);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(new AppError("Invalid token.", 401));
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Not authenticated.", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("Insufficient permissions.", 403));
    }

    next();
  };
};

export { AuthRequest };
