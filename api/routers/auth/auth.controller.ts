import { Request, Response } from "express";

import { registerService } from "../../services/auth/register.service";
import { LoginService } from "../../services/auth/login.service";


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
};
