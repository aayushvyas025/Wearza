import express from "express";
import { requireAuth } from "../../middlewares/auth/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.util.js";
import { userSync } from "../../controllers/auth/auth.controller.js";

const router = express.Router();

router.post("/auth/sync", requireAuth, asyncHandler(userSync));

export default router;
