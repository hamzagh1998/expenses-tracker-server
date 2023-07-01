import mongoose, { Document, Schema } from "mongoose";

interface IMonthlyPaymentReminder extends Document {
  user: Schema.Types.ObjectId;
  paymentDetail: Schema.Types.ObjectId;
  year: string;
  month: string;
  day: string;
  isSalaryPaid: boolean;
}

const MonthlyPaymentReminderSchema: Schema<IMonthlyPaymentReminder> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentDetail: {
      type: Schema.Types.ObjectId,
      ref: "PaymentDetail",
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
    isSalaryPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const MonthlyPaymentReminder = mongoose.model<IMonthlyPaymentReminder>("MonthlyPaymentReminder", MonthlyPaymentReminderSchema);

