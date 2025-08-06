const { fetchCityData } = require("../api/cities");

// Test case to verify city suggestions when input partially matches city names
test('Returns city suggestions matching input', () => {
  // Call fetchCityData with input string 'Cape'
  const results = fetchCityData('Cape');
  
  // Expect the results array to contain exactly one city
  expect(results).toHaveLength(1);
  
  // Expect the name of the first city in results to be 'Cape Town'
  expect(results[0].name).toBe('Cape Town');
});

// Test case to verify behavior when no city matches the input
test('Returns empty array if no match', () => {
  // Call getCitySuggestions with input string 'Xyz' that matches no city
  const results = getCitySuggestions('Xyz');
  
  // Expect the results array to be empty
  expect(results).toHaveLength(0);
});