const { gql } = require('apollo-server');

const typeDefs = gql`
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
    # Returns a list of cities matching the input string
    fetchCityData(city: String!): [City]

    # Returns current weather for the specified city
    fetchWeatherData(city: String!): Weather

    # Returns ranked activities based on weather for the specified city
    rankActivities(city: String!): [Activity]
  }
`;

module.exports = typeDefs;
