import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://nitrofood-production.up.railway.app/graphql", // replace with your actual GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
