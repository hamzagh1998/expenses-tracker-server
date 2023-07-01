import cluster, { Cluster, Worker } from "cluster";
import { cpus } from "os";
import dotenv from "dotenv";
import ip from "ip";
import path from "path";

import { app } from "./app";
import { spawnWorker } from "./utils/spawn-worker";
import { connectDB } from "./config/connect.db";
import { logger } from "./logger/logger";

dotenv.config({ path: path.join(__dirname, "../.env") });

const PORT = Number(process.env.PORT) || 5000;
const processesNum = cpus().length;

process.env.NODE_ENV === "production"
  ? connectDB(process.env.MONGO_PRO_URL!)
  : connectDB(process.env.MONGO_DEV_URL!);  

if (process.env.NODE_ENV === "production") {
  if (cluster.isPrimary) {
    let workers: Array<Worker> = [];
    
    for (let i=0; i<processesNum; i++) spawnWorker<Worker, Cluster>(workers, cluster, i);
  } else {
    app.listen(PORT, () => logger.info("Worker run on port: " + PORT));
  };

} else if (process.env.NODE_ENV === "development") {
  app.listen(PORT, () => logger.info("Server run on development mode on port: " + PORT));
} else {
  app.listen(PORT, ip.address(), 
    () => logger.info("Server run on development mode on: " + ip.address() + ":" + PORT));
};