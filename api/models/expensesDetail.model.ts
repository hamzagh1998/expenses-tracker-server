import mongoose, { Document, Schema } from "mongoose";

interface IExpensesDetail extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  bgColor?: string;
  icon?: string;
}

const ExpensesDetailSchema: Schema<IExpensesDetail> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bgColor: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ExpensesDetail = mongoose.model<IExpensesDetail>("ExpensesDetail", ExpensesDetailSchema);
