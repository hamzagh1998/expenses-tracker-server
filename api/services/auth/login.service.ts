import { logger } from "../../logger/logger";

import { findUser } from "../../repositories/user.queries";

import { passwordVerifier } from "../../utils/password-verifier";
import { tokenGenerator } from "../../utils/token-generator";
import { AuthServicesResponsesI, PayloadI } from "./interfaces";

import { registerService } from "./register.service";


export async function LoginService(payload: PayloadI): Promise<AuthServicesResponsesI> {
  const { email, provider } = payload;

  const [error, data] = await findUser({ email });
  if (error) {
    logger.error(`Error occur while trying to find user with this email: ${email}\n Error trace: ${error}`);
    return {error: true, status: 500, detail: "Internal server error!"};
  } else if (!data && provider === "email") {
    logger.warn(`Login failed: no account with this email found: ${email}!`)
    return {error: true, status: 404, detail: "Email not found!"}
  } else if (!data && provider === "google") {
    return await registerService(payload);
  };

  const isPasswordCorrect = provider === "email" ? await passwordVerifier(payload.password!, data.password) : true;
  if (!isPasswordCorrect) {
    logger.warn(`Login failed with this email "${email}": incorrect password!`);
    return {error: true, status: 401, detail: "Incorrect password!"};
  };

  const {_id, password, createdAt, updatedAt, ...rest} = data;

  const token = await tokenGenerator(rest);
  return {error: false, status: 200, detail: token};
};