import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import typeDefs from './schema';
import resolvers from './resolvers';
import db from './models/index';
import times from 'lodash.times';
import faker from 'faker';

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: { db }
});

const PORT = 8080;
const app = express();
server.applyMiddleware({ app });

db.sequelize.sync().then(() => {
  // populate tasks table with dummy data
  db.tasks.bulkCreate(
    times(1, () => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
    }))
  );

  app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
  );
});
