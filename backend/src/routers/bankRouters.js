import express from "express";
import {
  createBankAccount,
  deleteBankAccount,
  depositeMoney,
  transferMoney,
  withDrawMoney,
} from "../controllers/bankController.js";

const router = express.Router();
router.route("/create-bank-account").post(createBankAccount);
router.route("/deposite-money/:bankId").patch(depositeMoney);
router.route("/withdraw-money/:bankId").patch(withDrawMoney);
router.route("/delete-account/:bankId").patch(deleteBankAccount);
router.route("/transfer/:receiversBankId").patch(transferMoney);

export default router;
