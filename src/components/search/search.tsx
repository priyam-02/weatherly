import { useState } from "react";
import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";
import { CityOption, GeoDBResponse } from "../../types/location.types";
import { useGeolocation } from "../../hooks/useGeolocation";
import { DEFAULT_CITIES, SEARCH_CONFIG } from "../../config/constants";
import TemperatureToggle from "../settings/TemperatureToggle";
import "./search.css";

interface SearchProps {
  onSearchChange: (searchData: CityOption | null) => void;
  onToggleFavorites: () => void;
  showFavorites: boolean;
}

const Search = ({ onSearchChange, onToggleFavorites, showFavorites }: SearchProps) => {
  const [search, setSearch] = useState<CityOption | null>(null);
  const { loading: isLoadingLocation, error: locationError, getCurrentLocation } = useGeolocation();

  const loadOptions: LoadOptions<CityOption, any, any> = async (inputValue) => {
    // If input is empty, show some popular cities as defaults
    if (!inputValue || inputValue.trim().length === 0) {
      return {
        options: [...DEFAULT_CITIES],
      };
    }

    try {
      const response = await fetch(
        `${GEO_API_URL}?namePrefix=${inputValue}`,
        geoApiOptions
      );
      const data: GeoDBResponse = await response.json();

      // Check if response has data array
      if (!data.data || !Array.isArray(data.data)) {
        console.error("Invalid response format:", data);
        return { options: [] };
      }

      return {
        options: data.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: city.regionCode
            ? `${city.name}, ${city.regionCode}, ${city.countryCode}`
            : `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (err) {
      console.error("Error loading cities:", err);
      return { options: [] };
    }
  };

  const handleOnChange = (searchData: CityOption | null) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const handleUseCurrentLocation = async () => {
    const coordinates = await getCurrentLocation();
    if (coordinates) {
      const locationData: CityOption = {
        value: `${coordinates.latitude} ${coordinates.longitude}`,
        label: "My Location",
      };
      setSearch(locationData);
      onSearchChange(locationData);
    }
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h1 className="search-title">Weatherly</h1>
        <p className="search-subtitle">Discover weather worldwide</p>
      </div>
      {locationError && (
        <div className="location-error" role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>{locationError}</span>
        </div>
      )}
      <div className="search-with-toggle">
        <div className="search-input-wrapper">
          <AsyncPaginate
            placeholder="Search for any city..."
            debounceTimeout={SEARCH_CONFIG.DEBOUNCE_MS}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            classNamePrefix="react-select"
          />
          <button
            className={`location-button ${isLoadingLocation ? 'loading' : ''}`}
            onClick={handleUseCurrentLocation}
            aria-label="Use current location"
          >
            <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="3"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <span>My Location</span>
          </button>
        </div>
        <div className="controls-group">
          <TemperatureToggle />
          <button
            className={`favorites-toggle ${showFavorites ? 'active' : ''}`}
            onClick={onToggleFavorites}
            aria-label="Toggle favorites"
            aria-pressed={showFavorites}
          >
            <svg viewBox="0 0 24 24" fill={showFavorites ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
