import mongoose, { Document, Schema } from "mongoose";

interface IDailyBalance extends Document {
  user: Schema.Types.ObjectId;
  saving: number;
  currentBalance: number;
  cache: number;
  year: string;
  month: string;
  day: string;
  date: string;
  dailyExpenses: Array<Schema.Types.ObjectId>;
}

const DailyBalanceSchema: Schema<IDailyBalance> = new Schema(
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
    date: {
      type: String,
      required: true,
    },
    dailyExpenses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Expenses",
      },
    ],
  },
  { timestamps: true }
);

export const DailyBalance = mongoose.model<IDailyBalance>("DailyBalance", DailyBalanceSchema);
