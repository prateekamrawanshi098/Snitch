import express from "express";
import multer from "multer";
import { createProduct } from "../controllers/product.controller.js";
import { authenticateSeller } from "../middlewares/product.middleware.js";
import { validateProductCreation } from "../validators/product.validator.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const productRouter = express.Router();

productRouter.post(
  "/",
  authenticateSeller,
  validateProductCreation,
  upload.array("images", 7),
  createProduct,
);

export default productRouter;
