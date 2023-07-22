import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLInputObjectType, GraphQLList } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { User } from '@prisma/client';
import { Context } from '../index.js';
import { PostType } from './post.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User Data',
  fields: () => ({

    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },

    profile: {
      type: ProfileType,
      resolve: async ({ id }: User, _args, { prisma }: Context) => {
        const profile = await prisma.profile.findUnique({ where: { userId: id } });
        return profile;
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: User, _args, { prisma }: Context) => {
        const posts = await prisma.post.findMany({ where: { authorId: id } });
        return posts;
      },
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: User, _args, { prisma }: Context) => {
        return await prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: id,
              },
            },
          },
        });
      },
    },
    
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: User, _args, { prisma }: Context) => {
        return prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: id,
              },
            },
          },
        });
      },
    }
  })
});

export const CreateUserType = new GraphQLInputObjectType({
  name: 'CreateUser',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }
})
