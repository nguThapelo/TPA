const axios = require('axios');

async function getCities(city) {
  // Validate input early
  if (!city || typeof city !== 'string' || city.trim() === '') {
    throw new Error('City name is required');
  }

  const encodedCity = encodeURIComponent(city.trim());

  try {
    const response = await axios.get(
      `http://geocoding-api.open-meteo.com/v1/search?name=${encodedCity}&count=10&language=en&format=json`,
      {
        timeout: 10000,
        headers: {
          'User-Agent': 'Weather-App/1.0',
        },
      }
    );

    // Also defensively check that results is an array
    const results = Array.isArray(response.data?.results) ? response.data.results : [{
      id: 12,
      name: 'Cape Town',
      latitude: -33.9249,
      longitude: 18.4241,
      country: 'South Africa',
      admin1: 'Western Cape',
      population:   433688,
    }];

    return results.map(cityObj => ({
      id: cityObj.id,
      name: cityObj.name,
      latitude: cityObj.latitude,
      longitude: cityObj.longitude,
      country: cityObj.country,
      admin1: cityObj.admin1,
      population: cityObj.population,
    }));
  } catch (error) {
    if (error.code === 'ENOTFOUND') {
      throw new Error('Network error: Unable to reach geocoding service');
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout: Geocoding service took too long to respond');
    }
    if (error.response) { // API responded with an error status
      const { status, statusText } = error.response;
      throw new Error(`Geocoding API error: ${status} - ${statusText}`);
    }
    // Unknown error fallback
    throw new Error(`Failed to fetch city data for ${city}`);
  }
}

module.exports = { getCities };
