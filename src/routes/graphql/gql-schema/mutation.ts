import { GraphQLObjectType } from 'graphql';
import { Context } from '../index.js';
import { CreateUserInputType, UserType, changeUserInputType } from '../types/user.js';
import { Post, Profile, User } from '@prisma/client';
import { PostType, changePostInputType, createPostInputType } from '../types/post.js';
import { ProfileType, changeProfileInputType, createProfileInputType } from '../types/profile.js';
import { UUIDType } from '../types/uuid.js';
import { ChangeArgs } from '../types/types.js';

export const mutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createUser: {
      type: UserType as GraphQLObjectType,
      args: {
        dto: { type: CreateUserInputType }
      },
      resolve(_obj, args: { dto: User }, context: Context) {
        const { prisma } = context;
        const { dto } = args;
        return prisma.user.create({
          data: dto
        });
      }
    },
    createPost: {
      type: PostType as GraphQLObjectType,
      args: {
        dto: { type: createPostInputType }
      },
      resolve(_obj, args: { dto: Post }, context: Context) {
        const { prisma } = context;
        const { dto } = args;
        return prisma.post.create({
          data: dto,
        });
      }
    },
    createProfile: {
      type: ProfileType as GraphQLObjectType,
      args: {
        dto: { type: createProfileInputType }
      },
      resolve(_obj, args: { dto: Profile }, context: Context) {
        const { prisma } = context;
        const { dto } = args;
        return prisma.profile.create({
          data: dto,
        });
      }
    },
    deletePost: {
      type: UUIDType,
      args: {
        id: { type: UUIDType }
      },
      resolve: async (_obj, { id }: Post, context: Context) => {
        const { prisma } = context;
        await prisma.post.delete({ where: { id } });
        return id;
      }
    },
    deleteUser: {
      type: UUIDType,
      args: {
        id: { type: UUIDType }
      },
      resolve: async (_obj, { id }: Post, context: Context) => {
        const { prisma } = context;
        await prisma.user.delete({ where: { id } });
        return id;
      }
    },
    deleteProfile: {
      type: UUIDType,
      args: {
        id: { type: UUIDType }
      },
      resolve: async (_obj, { id }: Post, context: Context) => {
        const { prisma } = context;
        await prisma.profile.delete({ where: { id } });
        return id;
      }
    },
    changeProfile: {
      type: ProfileType,
      args: {
        id: { type: UUIDType },
        dto: { type: changeProfileInputType }
      },
      resolve: async (_obj, { id, dto }: ChangeArgs, { prisma }: Context) => {
        return await prisma.profile.update({
          where: { id },
          data: dto
        });
      }
    },
    changePost: {
      type: PostType as GraphQLObjectType,
      args: {
        id: { type: UUIDType },
        dto: { type: changePostInputType }
      },
      resolve: async (_obj, { id, dto }: ChangeArgs, { prisma }: Context) => {
        return await prisma.post.update({
          where: { id },
          data: dto
        });
      }
    },
    changeUser: {
      type: UserType as GraphQLObjectType,
      args: {
        id: { type: UUIDType },
        dto: { type: changeUserInputType }
      },
      resolve: async (_obj, { id, dto }: ChangeArgs, { prisma }: Context) => {
        return await prisma.user.update({
          where: { id },
          data: dto
        });
      }
    },
    subscribeTo: {
      type: UserType as GraphQLObjectType,
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType }
      },
      resolve: async (_obj, args: { userId: string, authorId: string }, { prisma }: Context) => {
        const { userId, authorId} = args;
        return await prisma.user.update({
          where: { id: userId },
          data: { userSubscribedTo: { create: { authorId } } },
        });
      }
    },
    unsubscribeFrom: {
      type: UUIDType,
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType }
      },
      resolve: async (_obj, args: { userId: string, authorId: string }, { prisma }: Context) => {
        const { userId, authorId} = args;
        await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: userId,
              authorId
            },
          },
        });
        return userId;
      }
    }
  }
})