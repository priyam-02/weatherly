export default async function handler(req, res) {
  // Set CORS headers for local development
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Extract and validate namePrefix parameter
    const { namePrefix } = req.query;

    if (!namePrefix || namePrefix.trim().length === 0) {
      return res
        .status(400)
        .json({ error: "namePrefix parameter is required" });
    }

    // Validate namePrefix length
    if (namePrefix.length > 100) {
      return res
        .status(400)
        .json({ error: "namePrefix is too long (max 100 characters)" });
    }

    // Get API credentials from environment variables
    const rapidApiKey = process.env.RAPIDAPI_KEY;
    const rapidApiHost =
      process.env.RAPIDAPI_HOST || "wft-geo-db.p.rapidapi.com";

    if (!rapidApiKey) {
      console.error("RAPIDAPI_KEY environment variable is not set");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // Make request to GeoDB Cities API
    const geoApiUrl = `https://${rapidApiHost}/v1/geo/cities?namePrefix=${encodeURIComponent(namePrefix)}&limit=10`;

    const response = await fetch(geoApiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": rapidApiKey,
        "x-rapidapi-host": rapidApiHost,
      },
    });

    // Check if the API request was successful
    if (!response.ok) {
      console.error(
        `GeoDB API error: ${response.status} ${response.statusText}`
      );
      return res.status(response.status).json({
        error: "Failed to fetch cities from GeoDB API",
        details: response.statusText,
      });
    }

    // Parse and return the response
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in cities API:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
}
