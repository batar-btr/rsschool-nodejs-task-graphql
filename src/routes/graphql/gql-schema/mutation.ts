import { GraphQLObjectType } from 'graphql';
import { Context } from '../index.js';
import { CreateUserInputType, UserType } from '../types/user.js';
import { Post, Profile, User } from '@prisma/client';
import { PostType, createPostInputType } from '../types/post.js';
import { ProfileType, createProfileInputType } from '../types/profile.js';
import { UUIDType } from '../types/uuid.js';

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
  }
})