import type { Bike, BikeInput } from "../types/bike";

const API_URL = "/bikes";

export const getAllBikes = async (): Promise<Bike[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch bikes");
  }

  return response.json();
};

export const getBikeById = async (id: string): Promise<Bike> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch bike");
  }

  return response.json();
};

export const createBike = async (bike: BikeInput): Promise<Bike> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bike),
  });

  if (!response.ok) {
    throw new Error("Failed to create bike");
  }

  return response.json();
};

export const updateBike = async (
  id: string,
  bike: BikeInput
): Promise<Bike> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bike),
  });

  if (!response.ok) {
    throw new Error("Failed to update bike");
  }

  return response.json();
};

export const deleteBike = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete bike");
  }

  return response.json();
};