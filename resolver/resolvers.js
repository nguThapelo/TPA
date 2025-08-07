const { getCities } = require('../api/cities');
const { getWeather } = require('../api/weather');
const { rankActivities } = require('../general/rankActivities');

const resolvers = {
  Query: {
    getCities: async (_, { city }) => {
      try {
        if (!city || city.trim() === '') {
          throw new Error('City name is required');
        }
        const cities = await getCities(city);
        return cities || [];
      } catch (error) {
        console.log('Error fetching city data:', error.message);
        return [];
      }
    },

    getWeather: async (_, { city }) => {
      try {
        if (!city || city.trim() === '') {
          throw new Error('City name is required');
        }
        const cities = await getCities(city);
        if (!cities.length) throw new Error('City not found');

        const matchedCity = cities.find(
          (c) => c.name.toLowerCase() === city.toLowerCase()
        );
        if (!matchedCity) throw new Error('City not found');

        const weather = await getWeather(matchedCity.latitude, matchedCity.longitude);
        return weather || {};
      } catch (error) {
        console.log('Error fetching weather data:', error.message);
        throw error;
      }
    },

    rankActivities: async (_, { city }) => {
      try {
        if (!city || city.trim() === '') {
          throw new Error('City name is required');
        }
        const cities = await getCities(city);
        if (!cities.length) throw new Error('City not found');

        const matchedCity = cities.find(
          (c) => c.name.toLowerCase() === city.toLowerCase()
        );
        if (!matchedCity) throw new Error('City not found');

        const weather = await getWeather(matchedCity.latitude, matchedCity.longitude);
        const activities = rankActivities(weather);
        return activities || [];
      } catch (error) {
        console.log('Error ranking activities:', error.message);
        throw error;
      }
    }
  },
};

module.exports = resolvers;
