# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Weatherly is a React-based weather forecasting application that integrates:
- **OpenWeatherMap API** for current weather and 7-day forecasts
- **GeoDB Cities API** (RapidAPI) for location search with autocomplete

Built with Create React App (React 18.3.1) and follows a simple component-based architecture.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm start

# Run tests
npm test

# Build for production
npm run build
```

## API Configuration

API keys must be configured in [src/api.js](src/api.js):

1. **GeoDB API**: Update `x-rapidapi-key` in `geoApiOptions` object
   - Sign up at: https://rapidapi.com/wirefreethought/api/geodb-cities

2. **OpenWeatherMap API**: Update `WEATHER_API_KEY` constant
   - Sign up at: https://openweathermap.org/

Note: The api.js file currently contains placeholder values `'your_api_key'` that must be replaced.

## Architecture

### Data Flow

1. **User Search** → Search component loads cities from GeoDB API
2. **Location Selection** → App.js receives lat/lon coordinates
3. **Parallel API Calls** → App.js fetches both current weather and forecast from OpenWeatherMap
4. **State Update** → App.js updates state with weather data
5. **Rendering** → CurrentWeather and Forecast components display the data

### Component Structure

All components follow the pattern of having their own directory with component file and CSS:

- **Search** ([src/components/search/](src/components/search/))
  - Uses `react-select-async-paginate` for autocomplete
  - Fetches cities with population > 1M from GeoDB API
  - Returns `{value: "lat lon", label: "City, Country"}` format
  - 600ms debounce on input

- **CurrentWeather** ([src/components/current-weather/](src/components/current-weather/))
  - Displays current conditions: temp, feels like, wind, humidity, pressure
  - Weather icons loaded from [public/icons/](public/icons/) using OpenWeatherMap icon codes

- **Forecast** ([src/components/forecast/](src/components/forecast/))
  - Uses `react-accessible-accordion` for expandable 7-day forecast
  - Displays first 7 items from OpenWeatherMap forecast API
  - Calculates day names based on current day

### State Management

All state lives in [App.js](src/App.js):
- `currentWeather`: Object containing city name + OpenWeatherMap current weather data
- `forecast`: Object containing city name + OpenWeatherMap forecast data

Weather data fetching uses `Promise.all()` to fetch current weather and forecast in parallel.

### Static Assets

- Weather icons: Located in [public/icons/](public/icons/), referenced by OpenWeatherMap icon codes (e.g., `01d.png`)
- Icons are referenced in components as `icons/${iconCode}.png`

## Key Dependencies

- `react-select-async-paginate`: Autocomplete search with pagination
- `react-accessible-accordion`: Accessible accordion component for forecast display
- `@testing-library/*`: Testing utilities (configured with Create React App defaults)
