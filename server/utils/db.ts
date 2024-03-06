import mongoose from "mongoose";

require("dotenv").config();

const dbURI = process.env.DB_URI as string;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI).then((data: any) => {
      console.log("MongoDB connected");
    });
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
