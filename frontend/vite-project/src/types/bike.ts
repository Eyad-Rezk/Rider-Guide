export interface Bike {
  _id: string;
  brand: string;
  name: string;
  year: number;
  color: string;
  cc: number;
  category: string;
}

export type BikeInput = Omit<Bike, "_id">;