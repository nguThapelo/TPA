

        
    // This function ranks activities based on the weather data provided.
function rankActivities(weatherData = {}) {
    const { temperature, weatherCode } = weatherData;
    
    //skiing
    const skiingScore = (temperature < 5 && weatherCode >= 71 && weatherCode <= 77) ? 1 : 0;
    
    //surfing
    const surfingScore = (temperature > 20 && weatherCode >= 80 && weatherCode <= 82) ? 1 : 0;
    //indoor sightseeing
    const indoorSightseeingScore = (weatherCode >= 80 && weatherCode <= 82) ? 1 : 0;
    //outdoor sightseeing
    const outdoorSightseeingScore = (weatherCode >= 71 && weatherCode <= 77) ? 1 : 0;
    
    // It returns an array of activity objects with their respective scores.

    return [
        { activity: 'skiing', score: skiingScore },
        { activity: 'surfing', score: surfingScore },
        { activity: 'indoor sightseeing', score: indoorSightseeingScore },
        { activity: 'outdoor sightseeing', score: outdoorSightseeingScore }
    ]?.sort((a, b) => b?.score - a?.score) ?? [];
}