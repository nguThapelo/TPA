const { get } = require('axios');

async function getWeather(latitude, longitude) {
  try {
    const response = await get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    const { current_weather } = response.data || {};

    return {
      temperature: current_weather?.temperature ?? null,
      windSpeed: current_weather?.windspeed ?? null,
      weatherCode: current_weather?.weathercode ?? null,
    };
  } catch (error) {
    // Log error details (optional)
    console.log('Error fetching weather data:', error.message);
    throw new Error('Failed to fetch weather data');
  }
}

module.exports = { getWeather };
