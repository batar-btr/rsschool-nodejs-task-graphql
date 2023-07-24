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
      resolve: async ({ id }: User, _args, { loaders }: Context) => {
        const profile = await loaders.profileLoader.load(id);
        return profile;
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: User, _args, { loaders }: Context) => {
        const posts = await loaders.postsLoader.load(id);
        return posts;
      },
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: User, _args, { loaders }: Context) => {
        return await loaders.userSubs.load(id);
      },
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: User, _args, { loaders }: Context) => {
        return await loaders.subsToUser.load(id);
      },
    }
  })
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }
})

export const changeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});
