const axios = require('axios');
const { getCities } = require('../index');

jest.mock('axios');
const mockedAxios = axios;


describe('getCities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Returns city suggestions when API responds successfully', async () => {
    const mockResponse = {
      data: {
        results: [
          {
            id: 1,
            name: 'Cape Town',
            latitude: -33.9249,
            longitude: 18.4241,
            country: 'South Africa',
            admin1: 'Western Cape',
            population: 433688
          }
        ]
      }
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const results = await getCities('Cape');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://geocoding-api.open-meteo.com/v1/search?name=Cape&count=10&language=en&format=json',
      expect.objectContaining({
        timeout: 10000,
        headers: {
          'User-Agent': 'Weather-App/1.0'
        }
      })
    );

    expect(results).toHaveLength(1);
    expect(results[0]).toEqual({
      id: 1,
      name: 'Cape Town',
      latitude: -33.9249,
      longitude: 18.4241,
      country: 'South Africa',
      admin1: 'Western Cape',
      population: 433688
    });
  });

  test('Returns empty array when no cities match', async () => {
    const mockResponse = {
      data: {
        results: []
      }
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const results = await getCities('Xyz');

    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(0);
  });

  test('Returns empty array when API returns no results property', async () => {
    const mockResponse = {
      data: {}
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const results = await getCities('SomeCity');

    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(0);
  });

  test('Throws error for empty city name', async () => {
    await expect(getCities('')).rejects.toThrow('City name is required');
    await expect(getCities('   ')).rejects.toThrow('City name is required');
  });

  test('Throws error for null or undefined city name', async () => {
    await expect(getCities(null)).rejects.toThrow('City name is required');
    await expect(getCities(undefined)).rejects.toThrow('City name is required');
  });

  test('Handles network errors gracefully', async () => {
    const mockError = new Error('Network error');
    mockError.code = 'ENOTFOUND';
    mockedAxios.get.mockRejectedValue(mockError);

    await expect(getCities('Dubai')).rejects.toThrow('Network error: Unable to reach geocoding service');
  });

  test('Handles timeout errors gracefully', async () => {
    const mockError = new Error('Timeout');
    mockError.code = 'ECONNABORTED';
    mockedAxios.get.mockRejectedValue(mockError);

    await expect(getCities('Dubai')).rejects.toThrow('Request timeout: Geocoding service took too long to respond');
  });

  test('Handles API errors with status codes', async () => {
    const mockError = new Error('API Error');
    mockError.response = {
      status: 500,
      statusText: 'Internal Server Error'
    };
    mockedAxios.get.mockRejectedValue(mockError);

    await expect(getCities('Dubai')).rejects.toThrow('Geocoding API error: 500 - Internal Server Error');
  });

  test('Properly encodes city names with special characters', async () => {
    const mockResponse = {
      data: { results: [] }
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    await getCities('São Paulo');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'http://geocoding-api.open-meteo.com/v1/search?name=S%C3%A3o%20Paulo&count=10&language=en&format=json',
      expect.any(Object)
    );
  });
});