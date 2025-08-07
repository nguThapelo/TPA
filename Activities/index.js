function rankActivities(weatherData = {}) {
  const { temperature, weatherCode } = weatherData;

  const skiingScore = (temperature < 5 && weatherCode >= 71 && weatherCode <= 77) ? 1 : 0;
  const surfingScore = (temperature > 20 && weatherCode >= 80 && weatherCode <= 82) ? 1 : 0;
  const indoorSightseeingScore = (weatherCode >= 80 && weatherCode <= 82) ? 1 : 0;
  const outdoorSightseeingScore = (temperature > 5 && weatherCode >= 71 && weatherCode <= 77) ? 1 : 0;

  const activities = [
    { activity: 'skiing', score: skiingScore },
    { activity: 'surfing', score: surfingScore },
    { activity: 'indoor sightseeing', score: indoorSightseeingScore },
    { activity: 'outdoor sightseeing', score: outdoorSightseeingScore },
  ];

  // Define fixed priority for tie-breaking (lower index = higher priority)
  const priority = ['skiing', 'surfing', 'indoor sightseeing', 'outdoor sightseeing'];

  return activities.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;  // sort by descending score
    }
    // Tie-break by priority order
    return priority.indexOf(a.activity) - priority.indexOf(b.activity);
  });
}

module.exports = { rankActivities };
