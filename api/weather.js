const { get } = require('axios');


const apiUrl = process.env.WEATHER_API_URL;

async function fetchWeatherData(latitude, longitude) {
    try {
        const response = await get(`${apiUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        console.log("🚀 ~ fetchWeatherData ~ response:", response.data)
        // Axios puts the data inside 'data' property
        const { current_weather } = response.data;
        console.log("🚀 ~ fetchWeatherData ~ current_weather:", current_weather)

        // Return relevant weather data
        return {
            temperature: current_weather?.temperature ?? 'cannot determine temperature',
            windSpeed: current_weather?.windspeed ?? 'cannot determine wind speed',
            weatherCode: current_weather?.weathercode ?? 'cannot determine weather code',
        };
    } catch (error) {
        console.error(`Error fetching weather data for ${city}:`, error);
        throw new Error(`Failed to fetch weather data for ${city}`);
    }
}

module.exports = { fetchWeatherData };