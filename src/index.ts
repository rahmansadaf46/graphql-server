import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { logger } from './utils/logger';
import { authenticate } from './utils/auth';
import { queryResolvers } from './resolvers/query';
import { actionResolvers } from './resolvers/action';
import { triggerResolvers } from './resolvers/trigger';
import { nodeObjectResolvers } from './resolvers/nodeObject';
import { ForbiddenError } from './utils/errors';
import cors from 'cors';
import { GraphQLJSON, GraphQLLong } from 'graphql-scalars';

// Load environment variables
require('dotenv').config();

// Load GraphQL schema
const typeDefs = readFileSync(join(__dirname, 'schema', 'schema.graphql'), 'utf8');

// Combine resolvers
const resolvers = {
  JSON: GraphQLJSON,
  Long: GraphQLLong,
  Query: queryResolvers,
  Action: actionResolvers,
  Trigger: triggerResolvers,
  NodeObject: nodeObjectResolvers,
};

// Initialize Express app
const app: Application = express();

// Enable CORS
app.use(cors({
  origin: ['https://studio-ui-deployments.apollographql.com', 'http://localhost:4000'],
  credentials: true,
}));

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: { req: express.Request }) => {
    try {
      const authHeader = req.headers.authorization || '';
      const isAuthenticated = authenticate(authHeader);
      return { isAuthenticated };
    } catch (error) {
      logger.error('Authentication error:', error);
      throw new ForbiddenError('Unauthorized: Invalid or missing token');
    }
  },
  formatError: (error) => {
    logger.error('GraphQL Error:', error);
    return {
      message: error.message,
      code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
    };
  },
  introspection: process.env.NODE_ENV !== 'production',
});

// Start Apollo Server and apply middleware
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    logger.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    logger.info(`Bearer Token: ${process.env.AUTH_TOKEN}`);
  });
}

startServer().catch((error) => {
  logger.error('Server startup error:', error);
  process.exit(1);
});