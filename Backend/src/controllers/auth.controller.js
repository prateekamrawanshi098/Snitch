import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

/**============================================= */

async function sendResponseToken(user, res, message) {
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User created successfully",
    success: true,
    user: {
      id: user._id,
      email: user.email,
      contact: user.contact,
      fullname: user.fullname,
      role: user.role,
    },
  });
}

export async function registerController(req, res) {
  const { email, contact, password, fullname, isSeller } = req.body;

  const userAlreadyExists =await userModel.findOne({
    $or: [{ email }, { contact }],
  });

  if (userAlreadyExists) {
    return res.status(400).json({
      message: "User Already Exists",
    });
  }

  const user = await userModel.create({
    email,
    contact,
    password,
    fullname,
    role: isSeller ? "seller" : "buyer",
  });

  await sendResponseToken(user, res, "user register successfully");
}
