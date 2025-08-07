const { resolvers } = require('../resolver/resolvers');
const apiCities = require('../api/cities');
const apiWeather = require('../api/weather');
const rankActivities = require('../general/rankActivities').rankActivities;

jest.mock('../api/cities');
jest.mock('../api/weather');
jest.mock('../general/rankActivities');

describe('GraphQL Resolvers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCities', () => {
    test('returns city list', async () => {
      const mockCities = [{ name: 'TestCity', country: 'TestCountry', latitude: 0, longitude: 0 }];
      apiCities.getCities.mockResolvedValue(mockCities);

      const result = await resolvers.Query.getCities(null, { city: 'Test' });
      expect(apiCities.getCities).toHaveBeenCalledWith('Test');
      expect(result).toEqual(mockCities);
    });

    test('returns empty array on error or empty city', async () => {
      apiCities.getCities.mockImplementation(() => { throw new Error('fail'); });
      const result = await resolvers.Query.getCities(null, { city: ' ' });
      expect(result).toEqual([]);
    });
  });

  describe('getWeather', () => {
    test('returns weather for matched city', async () => {
      const city = 'TestCity';
      const mockCities = [{ name: 'TestCity', country: 'TestCountry', latitude: 0, longitude: 0 }];
      const mockWeather = { temperature: 20, weatherCode: 1, windSpeed: 5 };

      apiCities.getCities.mockResolvedValue(mockCities);
      apiWeather.getWeather.mockResolvedValue(mockWeather);

      const result = await resolvers.Query.getWeather(null, { city });
      expect(apiCities.getCities).toHaveBeenCalledWith(city);
      expect(apiWeather.getWeather).toHaveBeenCalledWith(0, 0);
      expect(result).toEqual(mockWeather);
    });

    test('throws error if city not found', async () => {
      apiCities.getCities.mockResolvedValue([]);

      await expect(resolvers.Query.getWeather(null, { city: 'Unknown' })).rejects.toThrow('City not found');
    });
  });

  describe('rankActivities', () => {
    test('returns activities ranking', async () => {
      const city = 'TestCity';
      const mockCities = [{ name: 'TestCity', country: 'TestCountry', latitude: 0, longitude: 0 }];
      const mockWeather = { temperature: 10, weatherCode: 72, windSpeed: 3 };
      const mockActivities = [
        { activity: 'skiing', score: 1 },
        { activity: 'surfing', score: 0 },
      ];

      apiCities.getCities.mockResolvedValue(mockCities);
      apiWeather.getWeather.mockResolvedValue(mockWeather);
      rankActivities.mockReturnValue(mockActivities);

      const result = await resolvers.Query.rankActivities(null, { city });
      expect(apiCities.getCities).toHaveBeenCalledWith(city);
      expect(apiWeather.getWeather).toHaveBeenCalledWith(0, 0);
      expect(rankActivities).toHaveBeenCalledWith(mockWeather);
      expect(result).toEqual(mockActivities);
    });

    test('throws error if city not found', async () => {
      apiCities.getCities.mockResolvedValue([]);

      await expect(resolvers.Query.rankActivities(null, { city: 'Unknown' })).rejects.toThrow('City not found');
    });
  });
});
