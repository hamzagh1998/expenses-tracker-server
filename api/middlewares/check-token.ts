import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { tryToCatch } from "../utils/try-to-catch";
import { logger } from "../logger/logger";

export async function checkToken(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    logger.error("Unauthorized: Authorization missing from the header!")
    return res.status(401).json({error: true, detail: "Unauthorized: Authorization missing from the header!"});
  };

  const token = req.headers.authorization.split(" ")[1];

  const [error, _] = await tryToCatch(jwt.verify, token, process.env.SECRET_KEY);
  
  if (!token || error) {
    logger.error("Unauthorized:" + error);
    return res.status(401).json({error: true, detail: "Unauthorized!"});
  };

  req.body.token = token;
  next();
};