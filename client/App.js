import React from 'react';
import { ApolloProvider } from 'react-apollo';

import Tabs from './src/components/Tabs';
import { client } from "./src/graphql/client";

export default App = () => (
  <ApolloProvider client={client}>
    <Tabs/>
  </ApolloProvider>
);
