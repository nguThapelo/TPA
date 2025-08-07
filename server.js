const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolver/resolvers');

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  try {
    const { url } = await server.listen({ port: 4000 });
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.log('Failed to start server:', error);
  }
}

startServer();
