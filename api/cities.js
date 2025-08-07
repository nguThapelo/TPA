
async function getCities(city) {
  console.log("🚀 ~ getCities ~ city:", city);
  
  if (!city || city.trim().length === 0) {
    throw new Error('City name is required');
  }

  try {
    console.log("🚀 ~ getCities inside~ city:", city);
    
    // Use encodeURIComponent to properly encode the city name for URL
    const encodedCity = encodeURIComponent(city.trim());
    const url = `http://geocoding-api.open-meteo.com/v1/search?name=${encodedCity}&count=10&language=en&format=json`;
    
    console.log("🚀 ~ API URL:", url);
    
    const response = await get(url, {
      timeout: 10000, // 10 second timeout
      headers: {
        'User-Agent': 'Weather-App/1.0'
      }
    });

    console.log("🚀 ~ getCities ~ response:", response.data);

    // The Open-Meteo geocoding API returns results in a 'results' property
    const cities = response.data?.results || [];
    
    return cities.map(city => ({
      id: city.id,
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
      country: city.country,
      admin1: city.admin1, // state/province
      population: city.population
    }));

  } catch (error) {
    console.log(`Error fetching city data for ${city}:`, error.response ? error.response.data : error.message);
    
    if (error.code === 'ENOTFOUND') {
      throw new Error('Network error: Unable to reach geocoding service');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout: Geocoding service took too long to respond');
    } else if (error.response) {
      throw new Error(`Geocoding API error: ${error.response.status} - ${error.response.statusText}`);
    } else {
      throw new Error(`Failed to fetch city data for ${city}: ${error.message}`);
    }
  }
}
