const axios = require('axios');
const { getWeather } = require('../api/weather');

jest.mock('axios');
const mockedAxios = axios;

describe('getWeather', () => {
  const latitude = 12.34;
  const longitude = 56.78;

  beforeEach(() => {
    jest.clearAllMocks();
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

    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await getWeather(latitude, longitude);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    expect(result).toEqual({
      temperature: 23,
      windSpeed: 10,
      weatherCode: 81
    });
  });

  test('Handles missing current_weather gracefully', async () => {
    mockedAxios.get.mockResolvedValue({ data: {} });

    const result = await getWeather(latitude, longitude);

    expect(result).toEqual({
      temperature: null,
      windSpeed: null,
      weatherCode: null
    });
  });

  test('Throws error when axios.get fails', async () => {
    const mockError = new Error('Network error');
    mockedAxios.get.mockRejectedValue(mockError);

    await expect(getWeather(latitude, longitude)).rejects.toThrow('Failed to fetch weather data');
  });

  test('Handles API response with partial data', async () => {
    const mockResponse = {
      data: {
        current_weather: {
          temperature: 25,
          // Missing windspeed and weathercode
        }
      }
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await getWeather(latitude, longitude);

    expect(result).toEqual({
      temperature: 25,
      windSpeed: null,
      weatherCode: null
    });
  });
});

