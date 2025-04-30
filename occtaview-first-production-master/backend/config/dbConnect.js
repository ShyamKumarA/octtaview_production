import mongoose from "mongoose";
import { DATABASE_URL } from "../config.js";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(
      DATABASE_URL
    );
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;