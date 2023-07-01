import mongoose from "mongoose";
import { logger } from "../logger/logger";

export async function connectDB(uri: string) {
  try {
    const conn = await mongoose.connect(uri);
    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  };
};