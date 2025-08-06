const { rankActivities } = require("../general/rankActivities");

// Ranks skiing highest when temperature is below 5 and weather code indicates snow
test('Ranks skiing highest when temperature is below 5 and weather code indicates snow', () => {
  const weatherData = { temperature: 0, weatherCode: 72 };
  const results = rankActivities(weatherData);

  expect(results).toHaveLength(4);
  // The highest score should be for skiing
  expect(results[0].activity).toBe('skiing');
  expect(results[0].score).toBe(1);
  // Surfing should have 0 score
  expect(results.find(a => a.activity === 'surfing').score).toBe(0);
});

//Ranks surfing and indoor sightseeing highest 
test('Ranks surfing and indoor sightseeing highest for warm weatherCode 80-82', () => {
  const weatherData = { temperature: 25, weatherCode: 81 };
  const results = rankActivities(weatherData);

  expect(results).toHaveLength(4);
  // The highest score should be surfing or indoor sightseeing (both have score 1)
  expect(results[0].score).toBe(1);
  expect(['surfing', 'indoor sightseeing']).toContain(results[0].activity);
  expect(['surfing', 'indoor sightseeing']).toContain(results[1].activity);
});

// Ranks outdoor sightseeing highest for weather
test('Ranks outdoor sightseeing highest for weather codes 71-77 with temps above 5', () => {
  const weatherData = { temperature: 10, weatherCode: 75 };
  const results = rankActivities(weatherData);

  expect(results).toHaveLength(4);
  // Highest score should be outdoor sightseeing with score 1
  expect(results[0].activity).toBe('outdoor sightseeing');
  expect(results[0].score).toBe(1);
  // Skiing should be 0 because temp > 5
  expect(results.find(a => a.activity === 'skiing').score).toBe(0);
});

// Returns all activities with score 0 if conditions are not met
test('Returns all activities with score 0 if conditions are not met', () => {
  const weatherData = { temperature: 15, weatherCode: 50 };
  const results = rankActivities(weatherData);

  expect(results).toHaveLength(4);
  results.forEach(activity => {
    expect(activity.score).toBe(0);
  });
});
