import { Request, Response } from "express";
import { Bikes } from "../models/bikes";


const getAllBikes = async (req: Request, res: Response) => {
  try {
    const bikes = await Bikes.find();
    res.status(200).json(bikes);
  }
  catch (error) {
    res.status(500).json({ message: "Error fetching bikes" });
  }
}

const getBikeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bike = await Bikes.findById(id);
    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }
    res.status(200).json(bike);
  }
  catch (error) {
    res.status(500).json({ message: "Error fetching bike" });
  }
}

const createBike = async (req: Request, res: Response) => {
  try{
    const bikeData = req.body;  
    const newBike = await Bikes.create(bikeData);
    res.status(201).json(newBike);
  }
  catch (error) {
    throw error;
    res.status(500).json({ message: "Error creating bike" });
  }
}

const updateBike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bikeData = req.body;
    const updatedBike = await Bikes.findByIdAndUpdate(id, bikeData, { new: true });
    res.status(200).json(updatedBike);
  } 
  catch (error) {
    res.status(500).json({ message: "Error updating bike" });
  }
}

const deleteBike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Bikes.findByIdAndDelete(id);
    res.status(200).json({ message: "Bike deleted successfully" });
  } 
  catch (error) {
    res.status(500).json({ message: "Error deleting bike" });
  }
}

export { 
    getAllBikes,
    getBikeById,
    createBike,
    updateBike,
    deleteBike
 };