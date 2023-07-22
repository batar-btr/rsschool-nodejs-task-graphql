import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { query } from './gql-schema/query.js';
import { mutation } from './gql-schema/mutation.js';

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

      return await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: { prisma }
      });
    },
  });
};

export default plugin;
