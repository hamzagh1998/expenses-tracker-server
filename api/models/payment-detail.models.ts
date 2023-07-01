import mongoose, { Document, Schema } from "mongoose";

interface IPaymentDetail extends Document {
  user: Schema.Types.ObjectId;
  hasMonthlySalary: boolean;
  salaryAmount?: number;
  paymentDay?: number;
  paymentCurrency?: number;
}

const PaymentDetailSchema: Schema<IPaymentDetail> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hasMonthlySalary: {
      type: Boolean,
      default: false,
    },
    salaryAmount: {
      type: Number,
    },
    paymentDay: {
      type: Number,
    },
    paymentCurrency: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const PaymentDetail = mongoose.model<IPaymentDetail>("PaymentDetail", PaymentDetailSchema);

