function rankActivities(weatherData = {}) {
  const { temperature = 0, weatherCode = 0 } = weatherData;

  // Define categories based on Open-Meteo weather codes
  const isSnowy = weatherCode >= 71 && weatherCode <= 77; // snow conditions
  const isClearOrCloudy = [0, 1, 2, 3].includes(weatherCode); // clear to partly cloudy
  const isStormyOrRainy = [45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 95, 96, 99].includes(weatherCode);

  // Your scoring logic updated for this mapping:
  const skiingScore = (temperature < 5 && isSnowy) ? 1 : 0;
  const surfingScore = (temperature > 20 && isClearOrCloudy) ? 1 : 0;
  const indoorSightseeingScore = isStormyOrRainy ? 1 : 0;
  const outdoorSightseeingScore = (temperature > 5 && (isClearOrCloudy || isSnowy)) ? 1 : 0;

  const activities = [
    { activity: 'skiing', score: skiingScore },
    { activity: 'surfing', score: surfingScore },
    { activity: 'indoor sightseeing', score: indoorSightseeingScore },
    { activity: 'outdoor sightseeing', score: outdoorSightseeingScore },
  ];

  const priority = ['skiing', 'surfing', 'indoor sightseeing', 'outdoor sightseeing'];

  return activities.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score; // sort by descending score
    }
    return priority.indexOf(a.activity) - priority.indexOf(b.activity);
  });
}

module.exports = { rankActivities };
