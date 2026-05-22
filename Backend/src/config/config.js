import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is undefined in env");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is undefined in env");
}

export const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
