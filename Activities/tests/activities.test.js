const { rankActivities } = require('../index');

describe('rankActivities', () => {
  test('Ranks skiing highest when temperature below 5 and snow weather code', () => {
    const weather = { temperature: 0, weatherCode: 72 }; // snow
    const results = rankActivities(weather);

    expect(results).toHaveLength(4);
    expect(results[0].activity).toBe('skiing');
    expect(results[0].score).toBe(1);
    expect(results.find(a => a.activity === 'surfing').score).toBe(0);
  });

  test('Ranks surfing and indoor sightseeing highest for warm and clear weather codes (0-3)', () => {
    // surfing should score 1 for warm and clear, indoor sightseeing should be 0 because no storm
    const weather = { temperature: 25, weatherCode: 1 }; // clear/partly cloudy
    const results = rankActivities(weather);

    expect(results).toHaveLength(4);
    // surfing should be top-ranked with score 1
    expect(results[0].activity).toBe('surfing');
    expect(results[0].score).toBe(1);
    // indoor sightseeing score should be 0 here (no storm/rain)
    expect(results.find(a => a.activity === 'indoor sightseeing').score).toBe(0);
  });

  test('Ranks indoor sightseeing highest for stormy/rainy weather codes', () => {
    const weatherCodesForStorm = [45, 51, 63, 95]; // sample stormy/rainy/fog codes
    for (const wc of weatherCodesForStorm) {
      const weather = { temperature: 15, weatherCode: wc };
      const results = rankActivities(weather);

      expect(results).toHaveLength(4);
      // indoor sightseeing should have score 1
      expect(results.find(a => a.activity === 'indoor sightseeing').score).toBe(1);
      // and should be ranked higher than others with score 0
      expect(results[0].activity).toBe('indoor sightseeing');
    }
  });

  test('Ranks outdoor sightseeing highest for temperature > 5 and clear or snow codes', () => {
    // Using clear weather code
    let weather = { temperature: 10, weatherCode: 1 }; // clear sky variant
    let results = rankActivities(weather);

    expect(results).toHaveLength(4);
    expect(results[0].activity).toBe('outdoor sightseeing');
    expect(results[0].score).toBe(1);

    // Using snow weather code
    weather = { temperature: 10, weatherCode: 75 }; // snow
    results = rankActivities(weather);

    expect(results[0].activity).toBe('outdoor sightseeing');
    expect(results[0].score).toBe(1);
  });

  test('Returns all activities with score 0 if conditions not met', () => {
    const weather = { temperature: 15, weatherCode: 50 }; // code not in any category
    const results = rankActivities(weather);

    expect(results).toHaveLength(4);
    results.forEach(a => expect(a.score).toBe(0));
  });
});
