
const { ApolloServer } = require('apollo-server');

// Function to start the Apollo Server
async function startServer() {

    // This function initializes the server 
    const server = new ApolloServer({ typeDefs, resolvers });

    // Start the server and listen on port 4000
    server.listen({ port: 4000 }).then(({ url }) => {
        // Log the URL where the server is running to the console
        console.log(`🚀 Server ready at ${url}`);
    });
}

// Invoke the function to start the server
startServer();