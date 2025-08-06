const axios = require('axios');
const { fetchWeatherData } = require('../api/weather');

jest.mock('axios');

describe('fetchWeatherData', () => {
  const apiUrlBackup = process.env.WEATHER_API_URL;
  const latitude = 12.34;
  const longitude = 56.78;

  beforeAll(() => {
    process.env.WEATHER_API_URL = 'http://fakeapi.com/weather';
  });

  afterAll(() => {
    process.env.WEATHER_API_URL = apiUrlBackup;
  });

  test('Returns formatted weather data when API responds successfully', async () => {
    const mockResponse = {
      data: {
        current_weather: {
          temperature: 23,
          windspeed: 10,
          weathercode: 81,
        }
      }
    };

    axios.get.mockResolvedValue(mockResponse);

    const result = await fetchWeatherData(latitude, longitude);

    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    expect(result).toEqual({
      temperature: 23,
      windSpeed: 10,
      weatherCode: 81
    });
  });

  test('Handles missing current_weather gracefully', async () => {
    axios.get.mockResolvedValue({ data: {} });

    const result = await fetchWeatherData(latitude, longitude);

    expect(result).toEqual({
      temperature: 'cannot determine temperature',
      windSpeed: 'cannot determine wind speed',
      weatherCode: 'cannot determine weather code'
    });
  });

  test('Throws error when axios.get fails', async () => {
    const mockError = new Error('Network error');
    axios.get.mockRejectedValue(mockError);

    await expect(fetchWeatherData(latitude, longitude)).rejects.toThrow('Failed to fetch weather data for undefined');
  });
});
