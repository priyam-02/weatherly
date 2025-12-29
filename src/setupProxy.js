const { createProxyMiddleware } = require("http-proxy-middleware");

// Load environment variables from .env.local
require("dotenv").config({ path: ".env.local" });

module.exports = function (app) {
  // Proxy for GeoDB Cities API
  app.get("/api/cities", async (req, res) => {
    const { namePrefix } = req.query;

    if (!namePrefix || namePrefix.trim().length === 0) {
      return res
        .status(400)
        .json({ error: "namePrefix parameter is required" });
    }

    if (namePrefix.length > 100) {
      return res
        .status(400)
        .json({ error: "namePrefix is too long (max 100 characters)" });
    }

    const rapidApiKey = process.env.RAPIDAPI_KEY;
    const rapidApiHost =
      process.env.RAPIDAPI_HOST || "wft-geo-db.p.rapidapi.com";

    if (!rapidApiKey) {
      console.error("RAPIDAPI_KEY environment variable is not set");
      return res.status(500).json({ error: "Server configuration error" });
    }

    try {
      const geoApiUrl = `https://${rapidApiHost}/v1/geo/cities?namePrefix=${encodeURIComponent(namePrefix)}&limit=10`;

      const response = await fetch(geoApiUrl, {
        method: "GET",
        headers: {
          "x-rapidapi-key": rapidApiKey,
          "x-rapidapi-host": rapidApiHost,
        },
      });

      if (!response.ok) {
        console.error(
          `GeoDB API error: ${response.status} ${response.statusText}`
        );
        return res.status(response.status).json({
          error: "Failed to fetch cities from GeoDB API",
          details: response.statusText,
        });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error in cities API:", error);
      return res.status(500).json({
        error: "Internal server error",
        message: error.message,
      });
    }
  });

  // Proxy for OpenWeatherMap API
  app.get("/api/weather", async (req, res) => {
    const { lat, lon, type } = req.query;

    if (!lat || !lon || !type) {
      return res.status(400).json({
        error: "Missing required parameters",
        required: ["lat", "lon", "type"],
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
      return res
        .status(400)
        .json({ error: "Invalid latitude (must be between -90 and 90)" });
    }

    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
      return res
        .status(400)
        .json({ error: "Invalid longitude (must be between -180 and 180)" });
    }

    if (type !== "current" && type !== "forecast") {
      return res.status(400).json({
        error: "Invalid type parameter",
        allowed: ["current", "forecast"],
      });
    }

    const weatherApiKey = process.env.WEATHER_API_KEY;
    const weatherApiUrl =
      process.env.WEATHER_API_URL || "https://api.openweathermap.org/data/2.5";

    if (!weatherApiKey) {
      console.error("WEATHER_API_KEY environment variable is not set");
      return res.status(500).json({ error: "Server configuration error" });
    }

    try {
      const endpoint = type === "current" ? "weather" : "forecast";
      const apiUrl = `${weatherApiUrl}/${endpoint}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        console.error(
          `OpenWeatherMap API error: ${response.status} ${response.statusText}`
        );

        if (response.status === 401) {
          return res.status(500).json({
            error: "Weather API authentication failed",
            details: "Invalid API key configuration",
          });
        }

        return res.status(response.status).json({
          error: "Failed to fetch weather data from OpenWeatherMap API",
          details: response.statusText,
        });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error in weather API:", error);
      return res.status(500).json({
        error: "Internal server error",
        message: error.message,
      });
    }
  });
};
