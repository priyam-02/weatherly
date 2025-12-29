import { useFavorites } from "../../hooks/useFavorites";
import { CityOption } from "../../types/location.types";
import "./FavoritesList.css";

interface FavoritesListProps {
  onSelectFavorite: (location: CityOption) => void;
  currentLocation?: string;
}

const FavoritesList = ({ onSelectFavorite, currentLocation }: FavoritesListProps) => {
  const { favorites, removeFavorite } = useFavorites();

  const handleSelectFavorite = (favorite: CityOption) => {
    onSelectFavorite(favorite);
  };

  const handleRemoveFavorite = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    removeFavorite(id);
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty" role="status">
        <div className="favorites-empty-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <h3 className="favorites-empty-title">No Favorites Yet</h3>
        <p className="favorites-empty-description">
          Save your favorite locations for quick access
        </p>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <div className="favorites-header">
        <div className="favorites-icon">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <h2 className="favorites-title">Favorites</h2>
        <span className="favorites-count">{favorites.length}</span>
      </div>

      <div className="favorites-grid" role="list">
        {favorites.map((favorite, index) => {
          const isActive = currentLocation === favorite.value;
          return (
            <div
              key={favorite.id}
              className={`favorite-item ${isActive ? "favorite-item--active" : ""}`}
              onClick={() => handleSelectFavorite({ label: favorite.label, value: favorite.value })}
              role="listitem"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="favorite-content">
                <span className="favorite-name">{favorite.label}</span>
                {isActive && <span className="favorite-badge">Current</span>}
              </div>
              <button
                className="favorite-remove"
                onClick={(e) => handleRemoveFavorite(favorite.id, e)}
                aria-label={`Remove ${favorite.label} from favorites`}
                title="Remove from favorites"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritesList;
