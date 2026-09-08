import { useEffect, useState } from "react";
import type { Bike, BikeInput } from "../types/bike";

interface BikeFormProps {
  bike?: Bike | null;
  onSubmit: (bike: BikeInput) => Promise<void>;
  onCancel: () => void;
}

const emptyBike: BikeInput = {
  brand: "",
  name: "",
  year: new Date().getFullYear(),
  color: "",
  cc: 0,
  category: "",
};

function BikeForm({ bike, onSubmit, onCancel }: BikeFormProps) {
  const [formData, setFormData] = useState<BikeInput>(emptyBike);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bike) {
      setFormData({
        brand: bike.brand,
        name: bike.name,
        year: bike.year,
        color: bike.color,
        cc: bike.cc,
        category: bike.category,
      });
    } else {
      setFormData(emptyBike);
    }
  }, [bike]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        name === "year" || name === "cc"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="bike-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Brand</label>

          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="e.g. Yamaha"
            required
          />
        </div>

        <div className="form-group">
          <label>Bike Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. R1"
            required
          />
        </div>

        <div className="form-group">
          <label>Year</label>

          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            min="1900"
            max="2100"
            required
          />
        </div>

        <div className="form-group">
          <label>Engine CC</label>

          <input
            type="number"
            name="cc"
            value={formData.cc}
            onChange={handleChange}
            min="1"
            placeholder="e.g. 1000"
            required
          />
        </div>

        <div className="form-group">
          <label>Color</label>

          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="e.g. Black"
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Sport">Sport</option>
            <option value="Naked">Naked</option>
            <option value="Cruiser">Cruiser</option>
            <option value="Touring">Touring</option>
            <option value="Adventure">Adventure</option>
            <option value="Scooter">Scooter</option>
            <option value="Off-Road">Off-Road</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="cancel-button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : bike
            ? "Update Bike"
            : "Add Bike"}
        </button>
      </div>
    </form>
  );
}

export default BikeForm;