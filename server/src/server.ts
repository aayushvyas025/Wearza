import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import configDatabase from "./configs/db/database.config.js";
import {
  errorHandler,
  notFound,
} from "./middlewares/error/error.middleware.js";
import { clerkMiddleware } from "@clerk/express";

async function mainServer() {
  try {
    await configDatabase();
    const app = express();
    const corsOrigin = process.env.CORS_ORIGINS?.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean);

    // common middleware
    app.use(
      cors({
        origin: corsOrigin,
        credentials: true,
      }),
    );

    app.use(express.json());
    app.use(morgan("dev"));
    // error middleware
    app.use(notFound);
    app.use(errorHandler);
    // auth middleware
    app.use(clerkMiddleware());

    const port = Number(process.env.PORT) || 3001;

    app.listen(port, () => {
      console.log(`Server up and running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`Error, while setup server: ${error}`);
  }
}

mainServer().catch((error) => {
  console.error("failed to start", error);
  process.exit(1);
});
