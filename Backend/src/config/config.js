import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is undefined in env");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is undefined in env");
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("CLIENT ID is not defined");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("CLIENT SECRET is defined");
}

export const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};
