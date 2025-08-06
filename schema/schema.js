const { gql } = require('apollo-server');

// Schema
const typeDefs = gql`

# GraphQL schema definition
  """This schema defines the types and queries for the weather application.
  It includes types for City and Weather, and a query to fetch weather data based on city
   name. then ranking the types of activities available"""
    # City type for fetching city data
    """This type represents a city with its name, country, latitude, and longitude.
  type City {
    name: String!           
    country: String!        
    latitude: Float!       
    longitude: Float!       
  }

  # Weather type for fetching weather data
  """This type represents the weather data for a specific city.
    type Weather {
    temperature: Float!
    weatherCode: Int!
    windSpeed: Float!
  }
    # Activity type for ranking activities
    type Activity {
        name: String!
        description: String
        category: String
        difficulty: Int
        duration: Int
        rating: Float

    # Query type for fetching data

  type Query {
    getCities: [City!]!
    fetchWeatherData(cityName: String!): Weather!
  }
  
  
  `;

module.exports = typeDefs;