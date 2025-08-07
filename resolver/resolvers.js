const { getCities } = require('../api/cities');
const { getWeather } = require('../api/weather');
const { rankActivities } = require('../general/rankActivities');

const resolvers = {
  Query: {
    fetchCityData: async (_, { city }) => {
      console.log("🚀 ~ city:", city)
      if (!city) {
        console.log('No city provided');
      }
      // Fetch city suggestions based on input string
      try {
        const cities = await getCities(city);
        return cities || [];
      } catch (error) {
        console.log('Error fetching city data:', error);
        return [];
      }
    },

    fetchWeatherData: async (_, { city }) => {
      const cities = await getCities(city);
      const matchedCity = cities.find(
        (c) => c.name.toLowerCase() === city.toLowerCase()
      );
      if (!matchedCity) throw new Error('City not found');

      const weather = await getWeather(matchedCity.latitude, matchedCity.longitude);
      return weather || {};
    },

    rankActivities: async (_, { city }) => {
      const cities = await getCities(city);
      const matchedCity = cities.find(
        (c) => c.name.toLowerCase() === city.toLowerCase()
      );
      if (!matchedCity) throw new Error('City not found');

      const weather = await getWeather(matchedCity.latitude, matchedCity.longitude);
      const activities = rankActivities(weather);
      return activities || [];
    }
  }
};

module.exports = resolvers;
