import mongoose, { Document, Schema } from "mongoose";

interface IExpenses extends Document {
  expensesDetail: Schema.Types.ObjectId;
  amount: number;
  cache: number;
  date: string;
  expenseDetail: Array<object>;
}

const ExpensesSchema: Schema<IExpenses> = new Schema(
  {
    expensesDetail: {
      type: Schema.Types.ObjectId,
      ref: "ExpensesDetail",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    cache: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    expenseDetail: [
      {
        type: Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true }
);

export const Expenses = mongoose.model<IExpenses>("Expenses", ExpensesSchema);

