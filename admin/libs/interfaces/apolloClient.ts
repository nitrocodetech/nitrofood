import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://drivio-backend-production.up.railway.app/graphql", // replace with your actual GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
