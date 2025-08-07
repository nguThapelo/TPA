const axios = require('axios');
const { getWeather } = require('../api/weather');

jest.mock('axios');

describe('getWeather', () => {
  const latitude = 12.34;
  const longitude = 56.78;

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

    const result = await getWeather(latitude, longitude);

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    expect(result).toEqual({
      temperature: 23,
      windSpeed: 10,
      weatherCode: 81
    });
  });

  test('Handles missing current_weather gracefully', async () => {
    axios.get.mockResolvedValue({ data: {} });

    const result = await getWeather(latitude, longitude);

    expect(result).toEqual({
      temperature: '',
      windSpeed: '',
      weatherCode: ''
    });
  });

  test('Throws error when axios.get fails', async () => {
    const mockError = new Error('Network error');
    axios.get.mockRejectedValue(mockError);

    await expect(getWeather(latitude, longitude)).rejects.toThrow('Failed to fetch weather data');
  });
});
