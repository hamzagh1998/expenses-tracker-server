import { User } from "../models/user.models";

import { tryToCatch } from "../utils/try-to-catch";


export async function createUser(payload: object) {
  const user = new User(payload);
  user.save();
  return user;
};

export async function findUser(filter: object) {
  return await tryToCatch((filter: object) => User.findOne(filter).lean(), filter);
};

export async function updateUser(filter: object, payload: Object) {
  return await tryToCatch((filter: object, payload: Object) => User.updateOne(filter, payload, { new: true }), filter, payload);
};