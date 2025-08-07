const { getCities } = require("../api/cities");

// Test case to verify city suggestions when input partially matches city names
test('Returns city suggestions matching input', () => {
  // Call getCities with input string 'Cape'
  const results = getCities('Cape');
  
  // Expect the results array to contain exactly one city
  expect(results).toHaveLength(1);
  
  // Expect the name of the first city in results to be 'Cape Town'
  expect(results[0].name).toBe('Cape Town');
});

// Test case to verify behavior when no city matches the input
test('Returns empty array if no match', async () => {
   // Call getCities with input string 'Xyz' that matches no city
  const results = await getCities('Xyz');
  
  // Expect results to be an array
  expect(Array.isArray(results)).toBe(true);
  
  // Expect the results array to be empty
  expect(results).toHaveLength(0);
});