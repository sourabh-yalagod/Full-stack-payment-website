import mongoose from "mongoose";
import { Bank } from "../models/bankModel.js";
import { asyncHandler } from "../utilities/asyncHandler.js";

const createBankAccount = asyncHandler(async (req, res) => {
  const { name, balance, location, pincode, owner } = req.body;
  console.log({ name, balance, location, pincode, owner });

  if (!name || !balance || !location || !pincode || !owner) {
    return res.json({
      success: false,
      message: "All the Fields are required.",
    });
  }
  const bank = await Bank.create({
    name,
    balance,
    location,
    pincode,
    owner: new mongoose.Types.ObjectId(owner || ""),
  });
  if (!bank) {
    return res.json({
      success: false,
      message: `Bank account creation failed.`,
    });
  }
  return res.json({
    success: true,
    message: `Bank account is create Sucessfully`,
    bank,
  });
});

const depositeMoney = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const { bankId } = req.params;
  if (!amount) {
    return res.json({
      success: false,
      message: "Amount is required",
    });
  }
  if (amount <= 500) {
    return res.json({
      success: false,
      message: "Amount should not be less than 500.",
    });
  }

  const bank = await Bank.findByIdAndUpdate(
    bankId,
    {
      $inc: {
        balance: amount,
      },
    },
    { new: true }
  );
  if (!bank) {
    return res.status(404).json({
      success: false,
      message: "Bank not found",
    });
  }

  return res.json({
    success: true,
    message: `${amount} is Deposited Successfully.`,
    balance: bank.balance,
  });
});

const withDrawMoney = asyncHandler(async (req, res) => {
  const { amount } = req?.body;
  const { bankId } = req?.params;
  if (!amount) {
    return res.json({
      success: false,
      message: "Amount is required.",
    });
  }
  const bank = await Bank.findOneAndUpdate(
    {
      _id: bankId,
      balance: { $gte: amount },
    },
    {
      $inc: { balance: -amount },
    },
    { new: true }
  );

  if (!bank) {
    return res.json({
      success: false,
      message: "Bank does not Exist.",
    });
  }
  return res.json({
    success: true,
    balance: bank?.balance,
    message: "Withdrawal successful",
  });
});

const deleteBankAccount = asyncHandler(async (req, res) => {
  const { bankId } = req.params;
  const bank = await Bank.findAndDelete(bankId);
  if (!bank) {
    return res.json({
      success: false,
      message: "Bank account deletion failed.",
    });
  }
  return res.json({
    success: true,
    message: "Bank account deleted successfully.",
  });
});

const transferMoney = asyncHandler(async (req, res) => {
  const { receiversBankId } = req.params;
  const { senderBankId, amount } = req.body;
  const senders = await Bank.findByIdAndUpdate(
    senderBankId,
    {
      $inc: { balance: -amount },
    },
    { new: true }
  );
  if (!senders) {
    return res.json({
      success: false,
      message: "something gone wrong from Senders side",
    });
  }
  const receivers = await Bank.findByIdAndUpdate(
    receiversBankId,
    {
      $inc: { balance: amount },
    },
    { new: true }
  );
  if (!receivers) {
    return res.json({
      success: false,
      message: "something gone wrong from Receivers side",
    });
  }
  return res.json({
    success: true,
    message: `${amount} is transfered successfully.`,
    senders,
    receivers,
  });
});

export {
  depositeMoney,
  createBankAccount,
  withDrawMoney,
  deleteBankAccount,
  transferMoney,
};
