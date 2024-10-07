import express from "express";
import { registerUser, signin, users, usersAccounts } from "../controllers/userController.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/signin").post(signin);
router.route("/users").get(users);
router.route("/user-account/:userId").get(usersAccounts);

export default router;
