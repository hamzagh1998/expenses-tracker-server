import { logger } from "../../logger/logger";
import { passwordHasher } from "../../utils/password-hasher";

import { updateUser } from "../../repositories/user.queries";

import { ResetPasswordPayloadI } from "./interfaces";


export async function passwordResetService(payload: ResetPasswordPayloadI): Promise<void> {
  const { email, password } = payload;

  const newPassword = passwordHasher(password)

  const [error, _] = await updateUser({ email }, { password: newPassword });
  if (error) {
    logger.error(`Error occur while trying to update user password with this email: ${email}\n Error trace: ${error}`);
  } else {
    logger.info("Password has successfully updated")
  };
};