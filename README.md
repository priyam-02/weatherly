# Weatherly 🌤️

> A production-grade weather forecasting application built with React, TypeScript, and modern web technologies

[![TypeScript](https://img.shields.io/badge/TypeScript-5.1+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()

Weatherly is a feature-rich weather application that provides real-time weather data and 7-day forecasts for locations worldwide. Built with TypeScript for type safety and featuring a refined editorial design aesthetic, it demonstrates modern React patterns, custom hooks, and production-ready development practices.

## ✨ Features

### Core Functionality
- **Real-Time Weather Data** - Current conditions including temperature, humidity, wind speed, and pressure
- **7-Day Forecast** - Detailed daily forecasts with expandable accordion interface
- **Smart Location Search** - Autocomplete city search powered by GeoDB Cities API with state/region codes
- **Geolocation Support** - "Use My Location" feature for instant weather based on your coordinates

### Advanced Features
- **Temperature Unit Conversion** - Toggle between Celsius and Fahrenheit with animated slider
- **Favorites System** - Save up to 10 favorite locations for quick access
- **Persistent Settings** - Temperature preferences and favorites saved to localStorage
- **Cross-Tab Sync** - Settings automatically sync across browser tabs

### User Experience
- **Loading States** - Elegant spinner and skeleton loaders during data fetching
- **Error Handling** - User-friendly error messages with retry functionality
- **Empty States** - Welcoming empty states with suggested cities
- **Editorial Design** - Clean, professional aesthetic with refined typography and subtle animations
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Accessible** - ARIA labels, keyboard navigation, and screen reader support

## 🎨 Design Highlights

- **Editorial Aesthetic** - Cream background (#FDFCFA) with dark navy text (#1A2332) for a refined, magazine-like appearance
- **Sophisticated Typography** - Crimson Pro serif for headlines, DM Sans for body text
- **Accent Colors** - Sky blue (#0EA5E9) and amber (#F59E0B) gradient accents for visual interest
- **Clean Cards** - White backgrounds with refined borders and professional layouts
- **Subtle Animations** - Smooth transitions, staggered reveals, and micro-interactions
- **Professional Polish** - Production-ready UI that stands out in portfolios

## 🚀 Tech Stack

### Frontend
- **React 18.3** - Latest React with hooks and concurrent features
- **TypeScript** - Strict mode for complete type safety
- **Custom Hooks** - Clean architecture with reusable logic (`useWeatherData`, `useGeolocation`, `useFavorites`, `useLocalStorage`, `useDebounce`)
- **Context API** - Global state management for temperature settings

### APIs
- **OpenWeatherMap API** - Weather data and forecasts (via serverless proxy)
- **GeoDB Cities API** - Location search with autocomplete and region codes (via RapidAPI)

### UI Libraries
- **react-accessible-accordion** - Accessible forecast accordion
- **react-select-async-paginate** - Async search with pagination

### Deployment
- **Vercel Serverless Functions** - API proxies for secure key management
- **Development Proxy** - Local development server with API proxying via setupProxy.js

## 📁 Project Structure

```
weatherly/
├── api/                          # Vercel serverless functions
│   ├── cities.js                 # GeoDB Cities API proxy (production)
│   └── weather.js                # OpenWeatherMap API proxy (production)
├── src/
│   ├── components/
│   │   ├── current-weather/      # Current weather card
│   │   ├── forecast/             # 7-day forecast accordion
│   │   ├── search/               # Location search with geolocation
│   │   ├── settings/             # Temperature toggle
│   │   ├── favorites/            # Favorites list
│   │   ├── loading/              # Loading spinner & skeleton
│   │   ├── error/                # Error handling components
│   │   └── empty-states/         # Empty state displays
│   ├── config/
│   │   └── constants.ts          # App-wide constants
│   ├── context/
│   │   └── SettingsContext.tsx   # Temperature unit context
│   ├── hooks/
│   │   ├── useWeatherData.ts     # Weather fetching logic
│   │   ├── useGeolocation.ts     # Browser geolocation
│   │   ├── useFavorites.ts       # Favorites management
│   │   ├── useLocalStorage.ts    # localStorage sync
│   │   └── useDebounce.ts        # Debounce utility
│   ├── types/
│   │   ├── weather.types.ts      # Weather data types
│   │   ├── location.types.ts     # Location types
│   │   └── api.types.ts          # API types
│   ├── utils/
│   │   └── temperature.ts        # Temperature conversion
│   ├── setupProxy.js             # Development server API proxy
│   ├── App.tsx                   # Main app component
│   └── api.ts                    # API configuration
├── public/
│   └── icons/                    # Weather condition icons
├── tsconfig.json                 # TypeScript configuration
├── vercel.json                   # Vercel deployment config
└── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 14+ and npm
- API keys (free tier works fine)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/weatherly.git
cd weatherly
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up API Keys

#### Get Your Free API Keys:
1. **OpenWeatherMap**: Sign up at [openweathermap.org](https://openweathermap.org/api)
2. **GeoDB Cities**: Get RapidAPI key at [RapidAPI GeoDB](https://rapidapi.com/wirefreethought/api/geodb-cities)
   - Subscribe to the API (free tier available)
   - Copy your API key from the dashboard

#### Create Environment File:

Create a `.env.local` file in the root directory (use `.env.example` as a template):

```env
# RapidAPI Configuration for GeoDB Cities
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_HOST=wft-geo-db.p.rapidapi.com

# OpenWeatherMap Configuration
WEATHER_API_KEY=your_openweathermap_key_here
WEATHER_API_URL=https://api.openweathermap.org/data/2.5
```

**Important Notes:**
- Never commit `.env.local` to version control
- The `.env.example` file is provided as a template
- API keys are automatically loaded from environment variables
- For production deployment on Vercel, set these as environment variables in the Vercel dashboard

### 4. Start the Development Server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
```

Optimized production build will be created in the `build/` directory.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

#### Option 1: Vercel Dashboard (Easiest)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Create React App settings

3. **Configure Environment Variables**:
   Add these in Vercel dashboard → Settings → Environment Variables:
   - `RAPIDAPI_KEY`: Your RapidAPI key
   - `RAPIDAPI_HOST`: `wft-geo-db.p.rapidapi.com`
   - `WEATHER_API_KEY`: Your OpenWeatherMap key
   - `WEATHER_API_URL`: `https://api.openweathermap.org/data/2.5`

4. **Deploy**: Click "Deploy" and Vercel will build and deploy your app

#### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add RAPIDAPI_KEY
vercel env add RAPIDAPI_HOST
vercel env add WEATHER_API_KEY
vercel env add WEATHER_API_URL

# Deploy to production
vercel --prod
```

### What Happens During Deployment

- Vercel builds your React app
- Routes `/api/cities` requests to the serverless function in `api/cities.js`
- Routes `/api/weather` requests to the serverless function in `api/weather.js`
- API keys remain secure on the server (never exposed to the browser)
- In development, `setupProxy.js` handles both API endpoints locally

### Alternative Deployment

For other platforms (Netlify, etc.), you'll need to:
- Deploy the static build folder
- Set up serverless functions or API proxies for secure API key management
- Configure environment variables in your hosting platform

## 📖 Usage

### Search for Weather
1. Type a city name in the search bar (e.g., "Baltimore")
2. Select from autocomplete suggestions (shows format: "City, State, Country" or "City, Country")
3. View current weather and 7-day forecast

### Use Current Location
1. Click "My Location" button
2. Grant location permission when prompted
3. Weather for your coordinates will be displayed

### Manage Favorites
1. Click the heart icon on the weather card to add/remove favorites
2. Click the heart icon in the top bar to toggle favorites view
3. Click any favorite for instant weather data
4. Up to 10 favorites can be saved

### Change Temperature Unit
1. Use the °C/°F toggle at the top
2. All temperatures update instantly
3. Preference is saved for future visits

## 🎯 Key Architecture Patterns

### Custom Hooks for Clean Logic
- **`useWeatherData`** - Encapsulates all API fetching, loading, and error states
- **`useLocalStorage`** - React state synced with localStorage, cross-tab compatible
- **`useGeolocation`** - Browser geolocation with permission handling
- **`useFavorites`** - Complete favorites CRUD with max limits

### Centralized Configuration
- **Constants file** - All magic numbers, API endpoints, and default values
- **Type safety** - Comprehensive TypeScript types for all data structures
- **Environment config** - Secure API key management via environment variables

### Component Composition
- **Separation of concerns** - Each component has a single responsibility
- **Prop drilling avoided** - Context API for global state
- **Error boundaries** - Graceful error handling at the app level

## 🔧 Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Run development server on [localhost:3000](http://localhost:3000) |
| `npm run build` | Create optimized production build |
| `npm test` | Launch test runner in interactive watch mode |
| `npm run eject` | Eject from Create React App (⚠️ one-way operation) |

## 📦 Dependencies

### Core
- `react` (^18.3.1) - UI library
- `react-dom` (^18.3.1) - React rendering
- `typescript` (^4.9.5) - Type safety

### UI Components
- `react-accessible-accordion` - Accessible accordion for forecasts
- `react-select-async-paginate` - Async search with pagination

### Development
- `@types/react`, `@types/react-dom`, `@types/node` - TypeScript definitions
- `react-scripts` - Build tooling
- `dotenv` - Environment variable management
- `http-proxy-middleware` - Development API proxy

See [package.json](package.json) for complete dependency list.

## 🏗️ Development Highlights

This project showcases:

✅ **TypeScript Strict Mode** - Complete type safety across the codebase
✅ **Custom Hooks** - Reusable logic abstracted into well-documented hooks
✅ **Context API** - Global state management without prop drilling
✅ **localStorage Integration** - Persistent user preferences
✅ **Error Boundaries** - Graceful error handling
✅ **Responsive Design** - Mobile-first approach
✅ **Accessibility** - ARIA labels, keyboard navigation, semantic HTML
✅ **Loading States** - Skeleton loaders and spinners for better UX
✅ **Code Organization** - Clean architecture with separation of concerns
✅ **JSDoc Documentation** - Comprehensive comments for all custom hooks
✅ **Secure API Management** - Environment variables and serverless proxies
✅ **Editorial Design** - Professional, refined aesthetic

## 📝 API Documentation

### Weather API (`/api/weather`)
**Query Parameters:**
- `lat` (required) - Latitude (-90 to 90)
- `lon` (required) - Longitude (-180 to 180)
- `type` (required) - `current` or `forecast`

**Example:**
```
GET /api/weather?lat=40.7128&lon=-74.0060&type=current
GET /api/weather?lat=40.7128&lon=-74.0060&type=forecast
```

### Cities API (`/api/cities`)
**Query Parameters:**
- `namePrefix` (required) - City name to search (max 100 characters)

**Response Format:**
- Returns cities with state/region codes when available
- Format: "City, State, Country" (e.g., "Baltimore, MD, US")
- Or: "City, Country" for cities without region codes (e.g., "Paris, FR")

**Example:**
```
GET /api/cities?namePrefix=Baltimore
GET /api/cities?namePrefix=New%20York
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- City search powered by [GeoDB Cities](https://rapidapi.com/wirefreethought/api/geodb-cities)
- Weather icons from OpenWeatherMap icon set
- Fonts: [Google Fonts](https://fonts.google.com/) (Crimson Pro & DM Sans)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
