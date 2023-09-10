import jwt  from "jsonwebtoken";

export function refreshTokenGenerator(payload: object) {
  const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_2!);
  return refreshToken;
};