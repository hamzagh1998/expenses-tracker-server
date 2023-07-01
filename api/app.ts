import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import { checkToken } from "./middlewares/check-token";
import { verifyToken } from "./middlewares/verify-token";

import { authRouter } from "./routers/auth/auth.router";

const app = express();

// middlewares
app.use(cors());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"]
    }
  })
);

process.env.NODE_ENV !== "production" && app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.get("/", (_, res) => res.status(200).send("Hello There!"));
// Routes
app.use("/api/auth", verifyToken, authRouter);

export { app };