import { Router } from "express";

import { AuthController } from "./auth.controller";

// import { verifyFbPasswordResetCode } from "../../middlewares/verify-fb-pswreset-code";


export const authRouter = Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);
// authRouter.post("/new-password", verifyFbPasswordResetCode, AuthController.newPassword);