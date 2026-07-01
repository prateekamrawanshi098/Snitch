import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";

export const authenticateSeller = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "unauthorized token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        message: "unauthorized token",
      });
    }

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "user not found",
      });
    }

    const role = user.role;
    if (role !== "seller") {
      return res.status(403).json({
        message: "forbiden",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "unauthorized" });
  }
};
