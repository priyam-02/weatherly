export default async function handler(req, res) {
  // Set CORS headers for local development
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract and validate parameters
    const { lat, lon, type } = req.query;

    // Validate required parameters
    if (!lat || !lon || !type) {
      return res.status(400).json({
        error: 'Missing required parameters',
        required: ['lat', 'lon', 'type']
      });
    }

    // Validate latitude and longitude
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
      return res.status(400).json({ error: 'Invalid latitude (must be between -90 and 90)' });
    }

    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
      return res.status(400).json({ error: 'Invalid longitude (must be between -180 and 180)' });
    }

    // Validate type parameter
    if (type !== 'current' && type !== 'forecast') {
      return res.status(400).json({
        error: 'Invalid type parameter',
        allowed: ['current', 'forecast']
      });
    }

    // Get API credentials from environment variables
    const weatherApiKey = process.env.WEATHER_API_KEY;
    const weatherApiUrl = process.env.WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5';

    if (!weatherApiKey) {
      console.error('WEATHER_API_KEY environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Determine endpoint based on type
    const endpoint = type === 'current' ? 'weather' : 'forecast';

    // Build the API URL
    const apiUrl = `${weatherApiUrl}/${endpoint}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`;

    // Make request to OpenWeatherMap API
    const response = await fetch(apiUrl);

    // Check if the API request was successful
    if (!response.ok) {
      console.error(`OpenWeatherMap API error: ${response.status} ${response.statusText}`);

      // Handle specific error codes
      if (response.status === 401) {
        return res.status(500).json({
          error: 'Weather API authentication failed',
          details: 'Invalid API key configuration'
        });
      }

      return res.status(response.status).json({
        error: 'Failed to fetch weather data from OpenWeatherMap API',
        details: response.statusText
      });
    }

    // Parse and return the response
    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Error in weather API:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
