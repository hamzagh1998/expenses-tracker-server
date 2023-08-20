import { NextFunction, Request, Response } from "express";
import { firebaseAdmin } from "../config/firebase-config";

import { tryToCatch } from "../utils/try-to-catch";
import { logger } from "../logger/logger";


export async function verifyFbToken(req: Request, res: Response, next: NextFunction) {    
  const { userFbToken, ...rest } = req.body;

  if (!userFbToken) {
    logger.error("Unauthorized: firebase token missing!")
    return res.status(401).json({error: true, detail: "Unauthorized: firebase token missing!"});
  };

  const [error, decodeValue] = await tryToCatch((fbToken: string) => firebaseAdmin.auth().verifyIdToken(fbToken), userFbToken);
  if (error) {
    logger.error("Internal server error: " + error);
    return res.status(500).json({error: true, detail: "Internal server error!"});
  } else if (decodeValue) {
    req.body = rest;
    return next();
  } else {
    logger.error("Unauthorized: invalid firebase token!")
    return res.status(401).json({error: true, detail: "Unauthorized: invalid firebase token!"});
  };
};