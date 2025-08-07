const { get } = require('axios');

async function getCities(city) {
  console.log("🚀 ~ getCities ~ city:", city);
  try {
    // Create an https agent that disables SSL verification

    const response = await get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&limit=10`
    );

    console.log("🚀 ~ getCities ~ response:", response.data);

    return response.data ?? [];
  } catch (error) {
    console.log(`Error fetching city data for ${city}:`, error.response ? error.response.data : error.message);
    throw new Error(`Failed to fetch city data for ${city}`);
  }
}

module.exports = { getCities };
