import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables.");
}

const connectDB = async () => {
  while (true) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("Connected!");
      break;
    } catch (err) {
      console.error("Connection error. Retrying in 5 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

connectDB();
