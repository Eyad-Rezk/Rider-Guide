import mongoose, { Schema, Document } from "mongoose";

interface IBikes extends Document {
 
    brand: string;
    name: string;
    year: number;
    color: string;
    cc: number;
    category: string;

}

const bikeSchema = new Schema<IBikes>(
  {
        brand:{
        type: String,   
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    year:{
        type: Number,
        required: true,
    },
    color:{
        type: String,
        required: true,
    },
    cc:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
  });

export const Bikes = mongoose.model<IBikes>("Bikes", bikeSchema);