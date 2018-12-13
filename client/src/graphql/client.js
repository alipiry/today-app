import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const ENDPOINT = 'http://localhost:8080/graphql';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: ENDPOINT
  }),
  cache: new InMemoryCache()
});