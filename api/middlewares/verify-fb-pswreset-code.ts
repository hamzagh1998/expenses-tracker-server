import { NextFunction, Request, Response } from "express";
import { firebaseAdmin } from "../config/firebase-config";

import { tryToCatch } from "../utils/try-to-catch";
import { logger } from "../logger/logger";

export async function verifyFbPasswordResetCode(req: Request, res: Response, next: NextFunction) {
  const { oobCode, ...rest } = req.body;

  if (!oobCode) {
    logger.error("Unauthorized: firebase oobCode is missing!")
    return res.status(401).json({error: true, detail: "Unauthorized: reset code is missing!!"});
  };
  // Verify the password reset code
  const [error, data] = await tryToCatch((oobCode: string) => firebaseAdmin.auth().verifyPasswordResetCode(oobCode), oobCode);
  if (error) {
    logger.error("Unauthorized: invalid reset code!")
    return res.status(401).json({error: true, detail: "Unauthorized: invalid reset code!"});
  };

  req.body = {...rest, email: data.email};
  next();
};