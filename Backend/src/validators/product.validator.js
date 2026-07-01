import { body, validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      messgae: "invalid Data",
      errors: errors.arrays(),
    });
  }

  next();
};

export const validateProductCreation = [
  body("title").isEmpty().withMessage("title is required"),
  body("description").isEmpty().withMessage("Description is required"),
  body("priceAmount").isEmpty().withMessage("priceAmount is required"),
  body("priceCurrency").isEmpty().withMessage("priceCurrency is required"),
  validateRequest,
];
