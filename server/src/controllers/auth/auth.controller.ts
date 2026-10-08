import { clerkClient, getAuth } from "@clerk/express";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/appError.util.js";
import { getUserInfoFromClerk } from "../../utils/clerkUser.util.js";

export async function userSync(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { userId } = getAuth(request);
  if (!userId)
    throw new AppError(401, "Un-authorized, user should be authenticated");

  const clerkUser = await clerkClient.users.getUser(userId);
  
  const {name, email, adminEmails} =  getUserInfoFromClerk(clerkUser)

}
