const { gql } = require('apollo-server');

const typeDefs = gql`
 """
A city with its geographic data.
"""
type City {
  "Name of the city"
  name: String!
  "Country the city belongs to"
  country: String!
  "City latitude coordinate"
  latitude: Float!
  "City longitude coordinate"
  longitude: Float!
}

"""
Weather conditions at a location.
"""
type Weather {
  "Current temperature in Celsius"
  temperature: Float
  "Weather condition code"
  weatherCode: Int
  "Wind speed in km/h"
  windSpeed: Float
}

"""
An activity and its suitability score based on weather.
"""
type Activity {
  "Name of the activity"
  activity: String!
  "Suitability score between 0 and 1"
  score: Float!
}

"""
Queries you can run against the weather service.
"""
type Query {
  """
  Search for cities matching a given name (partial matches).
  """
  getCities(city: String!): [City]!

  """
  Get current weather for the specified city (exact match).
  """
  getWeather(city: String!): Weather

  """
  Rank activities based on current weather at the specified city.
  """
  rankActivities(city: String!): [Activity]!
}

`;

module.exports = typeDefs;
