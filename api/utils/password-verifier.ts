import bcrypt from "bcrypt";

export async function passwordVerifier(password: string, hashedPwd: string) {
  return await bcrypt.hash(password, hashedPwd);
}