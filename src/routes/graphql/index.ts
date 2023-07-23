import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql, validate, parse } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { query } from './gql-schema/query.js';
import { mutation } from './gql-schema/mutation.js';
import depthLimit from 'graphql-depth-limit';

export interface Context {
  prisma: PrismaClient
}
export interface NewUser {
  name: string;
  balance: number;
}

const schema = new GraphQLSchema({
  query,
  mutation
});


const plugin: FastifyPluginAsyncTypebox = async (fastify) => {

  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {

      const { query, variables } = req.body;

      const GQLErrors = validate(schema, parse(query), [depthLimit(5)]);

      if(GQLErrors.length > 0) {

        console.log('Maximum operation pepth is 5');
        return { errors: GQLErrors };

      } else {

        return await graphql({
          schema,
          source: query,
          variableValues: variables,
          contextValue: { prisma }
        });
        
      }

    },
  });
};

export default plugin;
