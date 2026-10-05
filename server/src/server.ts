import express from "express";
import "dotenv/config";
import configDatabase from "./configs/db/database.config.js";

async function mainServer() {
  try {
    await configDatabase();
    const app = express();
    const corsOrigin = process.env.CORS_ORIGINS?.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean);
  } catch (error) {
    console.error(`Error, while setup server: ${error}`);
  }
}

mainServer();
