import { NextFunction, Request, Response } from "express";
import { firebaseAdmin } from "../config/firebase-config";

import { tryToCatch } from "../utils/try-to-catch";
import { logger } from "../logger/logger";


export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    logger.error("Unauthorized: Authorization missing from the header!")
    return res.status(401).json({error: true, detail: "Unauthorized: Authorization missing from the header!"});
  };
    
  const token = req.headers.authorization.split(" ")[1];

  const [error, decodeValue] = await tryToCatch((token: string) => firebaseAdmin.auth().verifyIdToken(token), token);
  if (error) {
    logger.error("Internal server error: " + error);
    return res.status(500).json({error: true, detail: "Internal server error!"});
  } else if (decodeValue) {
    return next();
  } else {
    logger.error("Unauthorized: invalid token!")
    return res.status(401).json({error: true, detail: "Unauthorized: invalid token !"});
  };
};