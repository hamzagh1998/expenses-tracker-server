import mongoose, { Document, Schema } from "mongoose";

interface IMonthlyBalance extends Document {
  user: Schema.Types.ObjectId;
  savingFirstDay: number;
  savingLasttDay: number;
  currentBalance: number;
  cache: number;
  year: string;
  month: string;
  day: string;
  hour: string;
  date: string;
}

const MonthlyBalanceSchema: Schema<IMonthlyBalance> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    savingFirstDay: {
      type: Number,
      required: true,
    },
    savingLasttDay: {
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
    year: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const MonthlyBalance = mongoose.model<IMonthlyBalance>("MonthlyBalance", MonthlyBalanceSchema);
