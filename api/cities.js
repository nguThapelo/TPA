const { get } = require('axios');
const apiUrl = process.env.CITIES_API_URL;

async function fetchCityData(cityQuery) {
    try {
        const response = await get(`${apiUrl}name=${encodeURIComponent(cityQuery)}`);
        console.log("🚀 ~ fetchCityData ~ response:", response.data)

        return response.data;
    } catch (error) {
        console.error(`Error fetching city data for ${cityQuery}:`, error);
        throw new Error(`Failed to fetch city data for ${cityQuery}`);
    }
}

module.exports = { fetchCityData };