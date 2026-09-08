import { useEffect, useMemo, useState } from "react";
import "./App.css";
import BikeCard from "./components/BikeCard";
import BikeForm from "./components/BikeForm";

import {
  createBike,
  deleteBike,
  getAllBikes,
  updateBike,
} from "./services/bikeApi";

import type { Bike, BikeInput } from "./types/bike";

function App() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingBike, setEditingBike] = useState<Bike | null>(null);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllBikes();

      setBikes(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load bikes.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddBike = async (bike: BikeInput) => {
    try {
      const newBike = await createBike(bike);

      setBikes((previous) => [
        newBike,
        ...previous,
      ]);

      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Failed to create bike");
    }
  };

  const handleUpdateBike = async (bike: BikeInput) => {
    if (!editingBike) return;

    try {
      const updatedBike = await updateBike(
        editingBike._id,
        bike
      );

      setBikes((previous) =>
        previous.map((item) =>
          item._id === updatedBike._id
            ? updatedBike
            : item
        )
      );

      setEditingBike(null);
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update bike");
    }
  };

  const handleDeleteBike = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this bike?"
    );

    if (!confirmed) return;

    try {
      await deleteBike(id);

      setBikes((previous) =>
        previous.filter((bike) => bike._id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete bike");
    }
  };

  const handleEdit = (bike: Bike) => {
    setEditingBike(bike);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setEditingBike(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingBike(null);
    setShowForm(false);
  };

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(bikes.map((bike) => bike.category)),
    ];
  }, [bikes]);

  const filteredBikes = useMemo(() => {
    return bikes.filter((bike) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        bike.name.toLowerCase().includes(searchValue) ||
        bike.brand.toLowerCase().includes(searchValue) ||
        bike.color.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" ||
        bike.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [bikes, search, category]);

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">🏍️</span>

          <div>
            <h2>BikeVault</h2>
            <span>Motorcycle Management</span>
          </div>
        </div>

        <button
          className="add-bike-button"
          onClick={handleAddClick}
        >
          <span>+</span>
          Add Bike
        </button>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-label">
              MOTORCYCLE COLLECTION
            </span>

            <h1>
              Manage your
              <span> bikes.</span>
            </h1>

            <p>
              Keep your motorcycle collection organized,
              searchable and easy to manage.
            </p>
          </div>

          <div className="hero-stat">
            <strong>{bikes.length}</strong>
            <span>Total Bikes</span>
          </div>
        </section>

        <section className="toolbar">
          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search by name, brand or color..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="category-filter">
            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item
                    ? "active"
                    : ""
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {showForm && (
          <section className="form-section">
            <div className="section-heading">
              <div>
                <span className="small-label">
                  {editingBike ? "EDIT" : "NEW ENTRY"}
                </span>

                <h2>
                  {editingBike
                    ? "Update motorcycle"
                    : "Add a new motorcycle"}
                </h2>
              </div>
            </div>

            <BikeForm
              bike={editingBike}
              onSubmit={
                editingBike
                  ? handleUpdateBike
                  : handleAddBike
              }
              onCancel={handleCancel}
            />
          </section>
        )}

        <section className="bikes-section">
          <div className="section-heading">
            <div>
              <span className="small-label">
                COLLECTION
              </span>

              <h2>Your motorcycles</h2>
            </div>

            <span className="results-count">
              {filteredBikes.length} bikes
            </span>
          </div>

          {loading ? (
            <div className="state-message">
              <div className="spinner"></div>
              <p>Loading your bikes...</p>
            </div>
          ) : error ? (
            <div className="state-message error-state">
              <div className="state-icon">!</div>

              <h3>Something went wrong</h3>

              <p>{error}</p>

              <button
                onClick={fetchBikes}
                className="retry-button"
              >
                Try Again
              </button>
            </div>
          ) : filteredBikes.length === 0 ? (
            <div className="state-message empty-state">
              <div className="state-icon">🏍️</div>

              <h3>No bikes found</h3>

              <p>
                {bikes.length === 0
                  ? "Your collection is empty. Add your first bike."
                  : "Try changing your search or filter."}
              </p>

              {bikes.length === 0 && (
                <button
                  className="retry-button"
                  onClick={handleAddClick}
                >
                  Add Your First Bike
                </button>
              )}
            </div>
          ) : (
            <div className="bikes-grid">
              {filteredBikes.map((bike) => (
                <BikeCard
                  key={bike._id}
                  bike={bike}
                  onEdit={handleEdit}
                  onDelete={handleDeleteBike}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>
          BikeVault · Built with React, Express &
          MongoDB
        </p>
      </footer>
    </div>
  );
}

export default App;