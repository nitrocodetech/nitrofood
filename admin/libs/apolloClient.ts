import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql", // replace with your actual GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
