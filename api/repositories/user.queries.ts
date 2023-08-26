import { User } from "../models/user.models";

import { tryToCatch } from "../utils/try-to-catch";


export async function createUser(payload: object) {
  const user = new User(payload);
  user.save();
  return user;
};

export async function findUser(filter: object) {
  return await tryToCatch((filter: any) => User.findOne(filter).lean(), filter);
};