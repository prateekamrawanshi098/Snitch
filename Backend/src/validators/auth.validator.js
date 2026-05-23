import { body, validationResult } from "express-validator";

async function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
}

export const validateRegister = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .notEmpty()
    .withMessage("email cannot be empty"),
  body("contact")
    .matches(/^\d{10}$/)
    .withMessage("conatct must be exactly atleast 10 digits number")
    .notEmpty()
    .withMessage("conatct is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 character long")
    .notEmpty()
    .withMessage("password is required"),
  body("fullname")
    .notEmpty()
    .withMessage("fullname cant be empty")
    .isLength({ min: 2 })
    .withMessage("name must conatcin atleast 2 character"),
  body("isSeller").isBoolean().withMessage("isSeller must be a boolean value"),

  validateRequest,
];

export const validateLogin = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").notEmpty().withMessage("Password is required"),

  validateRequest,
];
