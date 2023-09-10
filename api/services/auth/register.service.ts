import { createUser, findUser } from "../../repositories/user.queries";

import { LoginService } from "./login.service";

import { logger } from "../../logger/logger";
import { tokenGenerator } from "../../utils/token-generator";
import { passwordHasher } from "../../utils/password-hasher";

import { AuthServicesResponsesI, AuthPayloadI } from "./interfaces";


export async function registerService(payload: AuthPayloadI): Promise<AuthServicesResponsesI> {
  const { firstName, lastName, email, photoURL, provider } = payload;  

  const [error, data] = await findUser({ email });
  if (error) {
    logger.error(`Error occur while try to find user with this email: ${email}\n Error trace: ${error}`);
    return {error: true, status: 500, detail: "Internal server error!"};
  }  else if (data && provider === "google") {
    return await LoginService(payload);
  } else if (data) {
    logger.warn(`Failed to create new account, user with this email: "${email}" already exists`);
    return {error: true, status: 409, detail: "Account with this email already exists!"}; // conflict
  };

  const avatar = provider === "email" ? `https://api.dicebear.com/6.x/initials/svg?radius=50&seed=${firstName} ${lastName}` : photoURL;
  const password = provider === "email" ? await passwordHasher(payload.password ? payload.password : "") : null;
  const userPayload = {...payload, avatar};
  if (password) userPayload.password = password;
  const user = await createUser(userPayload);
  const token = tokenGenerator(user);
  return {error: false, status: 201, detail: token};
};