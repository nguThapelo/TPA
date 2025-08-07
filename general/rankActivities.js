// This function ranks activities based on the weather data provided.
function rankActivities(weatherData = {}) {
    const { temperature, weatherCode } = weatherData;
    
    // skiing - cold temperature with snow weather codes
    const skiingScore = (temperature < 5 && weatherCode >= 71 && weatherCode <= 77) ? 1 : 0;
    
    // surfing - warm temperature with rain weather codes
    const surfingScore = (temperature > 20 && weatherCode >= 80 && weatherCode <= 82) ? 1 : 0;
    
    // indoor sightseeing - any rain weather codes (good to stay indoors)
    const indoorSightseeingScore = (weatherCode >= 80 && weatherCode <= 82) ? 1 : 0;
    
    // outdoor sightseeing - mild conditions with light precipitation
    const outdoorSightseeingScore = (temperature > 5 && weatherCode >= 71 && weatherCode <= 77) ? 1 : 0;
    
    // Return array of activity objects with their respective scores, sorted by score descending
    return [
        { activity: 'skiing', score: skiingScore },
        { activity: 'surfing', score: surfingScore },
        { activity: 'indoor sightseeing', score: indoorSightseeingScore },
        { activity: 'outdoor sightseeing', score: outdoorSightseeingScore }
    ].sort((a, b) => b.score - a.score);
}

module.exports = { rankActivities };