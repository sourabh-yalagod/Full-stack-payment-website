import { User } from "../models/userModel.js";
import { asyncHandler } from "../utilities/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Bank } from "../models/bankModel.js";
import mongoose from "mongoose";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, name, password } = req.body;
  if (!(username && email && name && password)) {
    return res.json({
      message: "please fill all the credentials",
    });
  }
  const isUserExist = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserExist) {
    return res.json({
      success: false,
      message: "User already Exist.",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    name,
  });
  if (!newUser) {
    return res.json({
      success: false,
      message: "User creation failed.",
    });
  }

  return res.json({
    success: true,
    message: "User created successfully.",
    user: newUser,
  });
});

const signin = asyncHandler(async (req, res) => {
  const username = req.body.identifier;
  const email = req.body.identifier;
  const password = req.body.password;

  if (!(username || email) || !password) {
    return res.json({
      success: false,
      message: "username/email and password is required.",
    });
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log("user : ", user);
  if (!user) {
    return res.json({
      success: false,
      message: "Wrong creatials.",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user?.password);
  if (!isPasswordValid) {
    return res.json({
      success: false,
      message: "password is incorrect.",
    });
  }
  const token = await jwt.sign(
    {
      id: user?._id,
      identifier: email || username,
    },
    process.env.SECRETE_KEY,
    {
      expiresIn: "1d",
    }
  );
  return res.json({
    success: true,
    message: "User logged in Successfully",
    token,
  });
});

const users = asyncHandler(async (req, res) => {
  const { search, limit, page } = req.query;
  console.log(limit, page);

  const searchRegex = search ? new RegExp(search, "i") : null;
  const users = search
    ? await User.find({
        $or: [
          { name: { $regex: searchRegex } },
          { username: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
        ],
      })
    : await User.find()
        .limit(limit)
        .skip(limit * (page - 1));

  if (!users) {
    return res.json({
      success: false,
      message: "Users fetching failed.",
    });
  }

  return res.json({
    success: true,
    message: "Users fetched successfully.",
    users: users,
  });
});

const usersAccounts = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const id = new mongoose.Types.ObjectId(userId);
  // const accounts = await Bank.find({
  //   owner: new mongoose.Types.ObjectId(userId),
  // });
  const accounts = await User.aggregate([
    {
      $match: {
        _id: id,
      },
    },
    {
      $lookup: {
        from: "banks",
        localField: "_id",
        foreignField: "owner",
        as: "accounts",
      },
    },
  ]);
  if (!accounts) {
    return res.json({
      success: false,
      message: "user accounts are failed to fetch TRY AGAIN.",
    });
  }
  return res.json({
    success: true,
    message: "user accounts are fetched successfully.",
    user: accounts[0],
  });
});

export { users, signin, registerUser, usersAccounts };
