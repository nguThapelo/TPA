const { gql } = require('apollo-server');

// Schema
const typeDefs = gql`

# GraphQL schema definition
  """This schema defines the types and queries for the weather application.
  It includes types for City and Weather, and a query to fetch weather data based on city
   name. then ranking the types of activities available"""
  
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
    fetchCityData(city: String!): City
    fetchWeatherData(city: String!): Weather
    rankActivities(city: String!): [Activity]
  }
  
  
  `;

module.exports = typeDefs;