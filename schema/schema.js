const { gql } = require('apollo-server');

const typeDefs = gql`
  """
Indicates exactly one field must be supplied and this field must not be null.
"""
directive @oneOf on INPUT_OBJECT

"""
This schema defines the types and queries for the weather application. 
It includes types for City, Weather, and Activity.
"""
type City {
  name: String!
  country: String!
  latitude: Float!
  longitude: Float!
}

type Weather {
  temperature: Float!
  weatherCode: Int!
  windSpeed: Float!
}

type Activity {
  activity: String!
  score: Float!
}

type Query {
  fetchCityData(city: String!): [City]
  fetchWeatherData(city: String!): Weather
  rankActivities(city: String!): [Activity]
}

`;

module.exports = typeDefs;
