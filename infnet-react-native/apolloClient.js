// apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create an HTTP link to connect to the Countries GraphQL API
const httpLink = new HttpLink({
  uri: 'https://countries.trevorblades.com/', // The Countries GraphQL endpoint
});

// Create an Apollo Client instance
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
