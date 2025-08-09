# Overview of My Travel Planner GraphQL API Architecture and Technical Choices
This project delivers a scalable and maintainable GraphQL API intended to help travelers plan their trips by providing accurate weather forecasts and activity recommendations tailored to the current weather conditions of a selected city.

Architecture and Core Components
- The API uses GraphQL with Apollo Server for flexible schema-driven queries.

- Axios powers the HTTP requests to the Open-Meteo public APIs.

- The backend is built on Node.js for asynchronous operation and ecosystem strength.

- Jest is used for unit testing the API logic and resolvers to ensure code quality.

Trade-Offs and Omissions
- The project currently only implements the backend API and does not include a frontend interface.

- There is no persistent storage or caching layer for city and weather data; all data is fetched live per request.

- The project lacks a complete build and deployment pipeline, which would be needed for production readiness.

- Some occasional difficulty in returning city suggestions may exist due to API or resolver limitations.

Use of AI Tools
- To accelerate and improve development:

- I leveraged AI tools like Perplexity to assist with researching and integrating open APIs for weather and city data.

- ChatGPT helped refine the README by assisting with grammar, clarity, and restructuring the documentation notes.

Future Improvements
- To evolve the project, I would focus on:

Data Persistence Layer:
- Introduce a database or cache to store popular city lookups and weather snapshots for enhanced performance and offline      analytics.

Frontend Application:
- Build a React interface to provide search autocomplete, weather visualization, activity rankings, and overall trip planning UX.

Advanced Activity Recommendations:
- Enhance ranking algorithms with seasonal trends, user preferences, and additional activity data for personalized suggestions.

Accommodation and Lifestyle Integrations:
- Suggest the best nearby accommodations tailored to the ranked activities; recommend weather-appropriate clothing and transport options to optimize traveler experience.

DevOps Enhancements:
- Implement automated builds, tests, and deployments to streamline development and release cycles.

Robust Validation and Monitoring:
- Improve API input validation layers and add logging/alerting to increase reliability and maintainability.

[![Build Status](https://app.travis-ci.com/nguThapelo/TPA.svg?token=u181h9zra4pJQPTUCHxw&branch=master)](https://app.travis-ci.com/nguThapelo/TPA)
