import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import jwt  from "jsonwebtoken";

import { checkToken } from "./middlewares/check-token";
import { verifyFbToken } from "./middlewares/verify-fb-token";

import { authRouter } from "./routers/auth/auth.router";
import { refreshTokenGenerator } from "./utils/refresh-token-generator";

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

app.use(morgan("dev"));

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (_, res) => res.status(200).send("Hello There!"));
// Route to get new access token using refresh token
// app.post("/api/refresh-token", (req, res) => {
//   const refreshToken = req.body.refreshToken;

//   jwt.verify(refreshToken, process.env.SECRET_KEY_2!, (err: any, user: any) => {
//     if (err) return res.sendStatus(403);

//     const accessToken = refreshTokenGenerator(user);
//     res.json({ accessToken });
//   });
// });
// Routes
app.use("/api/auth", verifyFbToken, authRouter);

export { app };