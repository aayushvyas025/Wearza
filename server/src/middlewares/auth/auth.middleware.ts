import { getAuth } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/appError.util.js";
import User from "../../models/user/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.util.js";

export async function requireAuth(
  request: Request,
  _response: Response,
  next: NextFunction,
) {
  const { userId } = getAuth(request);

  if (!userId) {
    next(new AppError(401, "Un-authorized, user must logged in"));
  }
  next();
}

export async function getDbUserFromReq(request: Request) {
  const { userId } = getAuth(request);

  if (!userId) {
    throw new AppError(401, "Un-authorized, user must logged in");
  }
  try {
    const dbUser = await User.findOne({ clerkUserId: userId });

    if (!dbUser) {
      throw new AppError(404, "User is not found in database");
    }

    return dbUser;
  } catch (error) {
    console.error(`Error while saving user to database: ${error}`);
  }
}

export const requireAdmin = asyncHandler(
  async (request: Request, _response: Response, next: NextFunction) => {
    const extractCurrentDBUser = await getDbUserFromReq(request);

    if (!extractCurrentDBUser || extractCurrentDBUser.role !== "admin") {
      throw new AppError(403, "Un-authorized, Admin access only");
    }
    next();
  },
);
