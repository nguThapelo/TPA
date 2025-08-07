const resolvers = require('../resolver/resolvers');
const citiesApi = require('../api/cities');
const weatherApi = require('../api/weather');
const rankActivities = require('../general/rankActivities');

jest.mock('../api/cities');
jest.mock('../api/weather');
jest.mock('../general/rankActivities');

describe('Resolvers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchCityData', () => {
    test('Returns cities from getCities', async () => {
      const mockCities = [{ name: 'Cape Town', country: 'South Africa', latitude: -33.9, longitude: 18.4 }];
      citiesApi.getCities.mockResolvedValue(mockCities);

      const result = await resolvers.Query.fetchCityData(null, { city: 'Cape' });
      expect(citiesApi.getCities).toHaveBeenCalledWith('Cape');
      expect(result).toEqual(mockCities);
    });

    test('Returns empty array on error', async () => {
      citiesApi.getCities.mockRejectedValue(new Error('API error'));

      const result = await resolvers.Query.fetchCityData(null, { city: 'Cape' });
      expect(result).toEqual([]);
    });
  });

  describe('fetchWeatherData', () => {
    test('Returns weather for matched city', async () => {
      const cityName = 'Cape Town';
      const cities = [{ name: cityName, country: 'SA', latitude: -33, longitude: 18 }];
      const weather = { temperature: 20, windSpeed: 5, weatherCode: 1 };

      citiesApi.getCities.mockResolvedValue(cities);
      weatherApi.getWeather.mockResolvedValue(weather);

      const result = await resolvers.Query.fetchWeatherData(null, { city: cityName });
      expect(citiesApi.getCities).toHaveBeenCalledWith(cityName);
      expect(weatherApi.getWeather).toHaveBeenCalledWith(-33, 18);
      expect(result).toEqual(weather);
    });

    test('Throws error if city not found', async () => {
      citiesApi.getCities.mockResolvedValue([{ name: 'Other City', latitude: 0, longitude: 0, country: 'X' }]);
      await expect(resolvers.Query.fetchWeatherData(null, { city: 'Missing City' })).rejects.toThrow('City not found');
    });
  });

  describe('rankActivities', () => {
    test('Returns ranked activities for city', async () => {
      const cityName = 'Cape Town';
      const cities = [{ name: cityName, country: 'SA', latitude: -33, longitude: 18 }];
      const weather = { temperature: 20, windSpeed: 5, weatherCode: 1 };
      const activities = [{ activity: 'hiking', score: 0.8 }];

      citiesApi.getCities.mockResolvedValue(cities);
      weatherApi.getWeather.mockResolvedValue(weather);
      rankActivities.mockReturnValue(activities);

      const result = await resolvers.Query.rankActivities(null, { city: cityName });

      expect(citiesApi.getCities).toHaveBeenCalledWith(cityName);
      expect(weatherApi.getWeather).toHaveBeenCalledWith(-33, 18);
      expect(rankActivities).toHaveBeenCalledWith(weather);
      expect(result).toEqual(activities);
    });

    test('Throws error if city not found', async () => {
      citiesApi.getCities.mockResolvedValue([{ name: 'Other City', latitude: 0, longitude: 0, country: 'X' }]);
      await expect(resolvers.Query.rankActivities(null, { city: 'Missing City' })).rejects.toThrow('City not found');
    });
  });
});
