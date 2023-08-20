import { createUser, findUser } from "../../repositories/user.queries";

import { logger } from "../../logger/logger";
import { tokenGenerator } from "../../utils/token-generator";
import { passwordHasher } from "../../utils/password-hasher";


interface PayloadI {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function registerService(payload: PayloadI) {
  const { firstName, lastName, email } = payload;  

  const [error, data] = await findUser({ email });
  if (error) {
    logger.error(`Error occur while try to find user with this email: ${email}\n Error trace: ${error}`);
    return {error: true, status: 500, detail: "Internal server error!"};
  } else if (data) {
    logger.warn(`Failed to create new account, user with this email: "${email}" already exists`)
    return {error: true, status: 409, detail: "Account with this email already exists!"}; // conflict
  };
  
  const avatar = `https://api.dicebear.com/6.x/initials/svg?radius=50&seed=${firstName} ${lastName}`;
  const password = await passwordHasher(payload.password);
  const user = await createUser({...payload, password, avatar});
  const token = tokenGenerator(user);
  return {error: false, status: 201, detail: token};
};