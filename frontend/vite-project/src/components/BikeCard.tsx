import type { Bike } from "../types/bike";

interface BikeCardProps {
  bike: Bike;
  onEdit: (bike: Bike) => void;
  onDelete: (id: string) => void;
}

function BikeCard({ bike, onEdit, onDelete }: BikeCardProps) {
  return (
    <article className="bike-card">
      <div className="bike-card-top">
        <div className="bike-icon">🏍️</div>

        <span className="category-badge">
          {bike.category}
        </span>
      </div>

      <div className="bike-info">
        <p className="bike-brand">{bike.brand}</p>

        <h3>{bike.name}</h3>

        <div className="bike-details">
          <div>
            <span>Year</span>
            <strong>{bike.year}</strong>
          </div>

          <div>
            <span>Engine</span>
            <strong>{bike.cc} CC</strong>
          </div>

          <div>
            <span>Color</span>
            <strong>{bike.color}</strong>
          </div>
        </div>
      </div>

      <div className="bike-actions">
        <button
          className="edit-button"
          onClick={() => onEdit(bike)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(bike._id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default BikeCard;