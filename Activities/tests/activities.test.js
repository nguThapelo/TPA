const { rankActivities } = require('../index');

describe('rankActivities', () => {
  test('Ranks skiing highest when temperature below 5 and snow weather code', () => {
    const weather = { temperature: 0, weatherCode: 72 };
    const results = rankActivities(weather);

    expect(results).toHaveLength(4);
    expect(results[0].activity).toBe('skiing');
    expect(results[0].score).toBe(1);
    expect(results.find(a => a.activity === 'surfing').score).toBe(0);
  });

  test('Ranks surfing and indoor sightseeing highest for warm weather code 80-82', () => {
    const weather = { temperature: 25, weatherCode: 81 };
    const results = rankActivities(weather);

    expect(results).toHaveLength(4);
    expect([results[0].activity, results[1].activity]).toEqual(
      expect.arrayContaining(['surfing', 'indoor sightseeing'])
    );
    expect(results[0].score).toBe(1);
    expect(results[1].score).toBe(1);
  });

  test('Ranks outdoor sightseeing highest for weatherCode 71-77 and temp > 5', () => {
    const weather = { temperature: 10, weatherCode: 75 };
    const results = rankActivities(weather);

    expect(results).toHaveLength(4);
    expect(results[0].activity).toBe('outdoor sightseeing');
    expect(results[0].score).toBe(1);
    expect(results.find(a => a.activity === 'skiing').score).toBe(0);
  });

  test('Returns all activities with score 0 if conditions not met', () => {
    const weather = { temperature: 15, weatherCode: 50 };
    const results = rankActivities(weather);

    expect(results).toHaveLength(4);
    results.forEach(a => expect(a.score).toBe(0));
  });
});
