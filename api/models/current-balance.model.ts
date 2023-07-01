import mongoose, { Document, Schema } from "mongoose";

interface ICurrentBalance extends Document {
  user: Schema.Types.ObjectId;
  saving: number;
  currentBalance: number;
  cache: number;
}

const CurrentBalanceSchema: Schema<ICurrentBalance> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    saving: {
      type: Number,
      required: true,
    },
    currentBalance: {
      type: Number,
      required: true,
    },
    cache: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const CurrentBalance = mongoose.model<ICurrentBalance>("CurrentBalance", CurrentBalanceSchema);
