import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';
import { Context } from '../index.js';
import { Post } from '@prisma/client';

export const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post data',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: UUIDType },
    author: {
      type: UserType as GraphQLObjectType,
      resolve: async (source: Post, _args, { prisma }: Context) => {
        const { authorId } = source;
        const author = await prisma.user.findUnique({ where: { id: authorId } });
        return author;
      }
    }
  })
})