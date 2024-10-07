import mogoose from "mongoose";
const bankSchema = mogoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Bank name is reuired."],
    },
    balance: {
      type: Number,
      required: [true, "Bank Balance is reuired."],
    },
    location: {
      type: String,
      required: [true, "Bank name is reuired."],
    },
    pincode: {
      type: Number,
      required: [true, "Bank PinCode is reuired."],
    },
    owner: {
      type: mogoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
export const Bank = mogoose.model("bank", bankSchema);
