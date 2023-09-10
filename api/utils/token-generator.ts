import jwt  from "jsonwebtoken";

export function tokenGenerator(payload: object) {
  const plainObject = JSON.parse(JSON.stringify(payload));
  return jwt.sign(plainObject, process.env.SECRET_KEY!);
};