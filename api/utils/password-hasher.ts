import bcrypt from "bcrypt";

export async function passwordHasher(password: string) {
  const saltRounds = 10; // You can adjust the number of salt rounds for the desired level of security
  return await bcrypt.hash(password, saltRounds);
}