import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  initialSavingAmount: number;
  completed: boolean;
  donated: boolean;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    initialSavingAmount: {
      type: Number,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    donated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);

