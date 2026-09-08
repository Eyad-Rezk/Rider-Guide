// import mongoose from 'mongoose';

// mongoose.connect('')
//   .then(() => console.log('Connected!'))
//   .catch(err => console.error('Connection error', err));


import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bikes";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected!"))
  .catch((err) => console.error("Connection error", err));