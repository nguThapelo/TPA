const axios = require('axios');
const https = require('https');
const { getCities } = require('../api/cities');

jest.mock('axios');

describe('getCities', () => {
  const cityName = 'Cape Town';
  const fakeResponseData = [
    {
      name: 'Cape Town',
      country: 'South Africa',
      latitude: -33.9249,
      longitude: 18.4241
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Returns cities array when API responds successfully', async () => {
    axios.get.mockResolvedValue({ data: fakeResponseData });

    const result = await getCities(cityName);

    // Ensure axios.get is called with the correct URL and httpsAgent
    expect(axios.get).toHaveBeenCalled();
    // Check for URL substring and httpsAgent presence
    const callArgs = axios.get.mock.calls[0];
    expect(callArgs[0]).toContain(encodeURIComponent(cityName));
    expect(callArgs[1]).toHaveProperty('httpsAgent');
    expect(callArgs[1].httpsAgent).toBeInstanceOf(https.Agent);

    expect(result).toEqual(fakeResponseData);
  });

  test('Throws error on API failure', async () => {
    const error = new Error('API failed');
    axios.get.mockRejectedValue(error);

    await expect(getCities(cityName)).rejects.toThrow(`Failed to fetch city data for ${cityName}`);
  });
});
