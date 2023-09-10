import { Request, Response } from "express";

import { registerService } from "../../services/auth/register.service";
import { LoginService } from "../../services/auth/login.service";
import { passwordResetService } from "../../services/auth/password-reset.service";


export class AuthController {
  static async register(req: Request, res: Response) {
    const payload = req.body;
    const data = await registerService(payload);
    res.status(data.status!).json({error: data.error, detail: data.detail})
  };

  static async login(req: Request, res: Response) {
    const payload = req.body;
    const data = await LoginService(payload);
    res.status(data.status!).json({error: data.error, detail: data.detail})
  };

  static async newPassword(req: Request, res: Response) {
    const payload = req.body;
    passwordResetService(payload);
  };
};
