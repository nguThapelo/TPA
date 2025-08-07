const https = require('https');
const { get } = require('axios');

async function getCities(city) {
  console.log("🚀 ~ getCities ~ city:", city);
  try {
    // Create an https agent that disables SSL verification
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    const response = await get(
      `https://api.api-ninjas.com/v1/city?name=${encodeURIComponent(city)}&limit=10`,
      { httpsAgent }
    );

    console.log("🚀 ~ getCities ~ response:", response.data);

    return response.data;
  } catch (error) {
    console.error(`Error fetching city data for ${city}:`, error.response ? error.response.data : error.message);
    throw new Error(`Failed to fetch city data for ${city}`);
  }
}

module.exports = { getCities };
