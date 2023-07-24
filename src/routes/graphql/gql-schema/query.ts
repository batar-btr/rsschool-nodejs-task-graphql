import { GraphQLObjectType, GraphQLList, GraphQLNonNull } from 'graphql';
import { Context } from '../index.js';
import { UUIDType } from '../types/uuid.js';
import { UserType } from '../types/user.js';
import { MemberIDGqlEnumType, MemberType } from '../types/member-type.js';
import { MemberTypeId } from '../../member-types/schemas.js';
import { PostType } from '../types/post.js';
import { ProfileType } from '../types/profile.js';
import { Post, Profile } from '@prisma/client';

export const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType as GraphQLObjectType,
      args: {
        id: {
          type: UUIDType
        }
      },
      resolve: async (_obj, args: { id: string }, context: Context) => {
        const { prisma } = context;
        const { id } = args;
        const user = await prisma.user.findUnique({
          where: {
            id
          },
        });
        return user;
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_obj, _args, context: Context) => {
        const { prisma } = context;
        return await prisma.user.findMany();
      }
    },
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_obj, _args, context: Context) => {
        const { prisma } = context;
        const memberTypes = await prisma.memberType.findMany();
        return memberTypes;
      }
    },
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberIDGqlEnumType) }
      },
      resolve: async (_obj, args: { id: MemberTypeId }, context: Context) => {
        const { prisma } = context;
        const { id } = args;
        const memberType = await prisma.memberType.findUnique({
          where: {
            id
          },
        });
        return memberType;
      }
    },
    post: {
      type: PostType as GraphQLObjectType,
      args: {
        id: { type: UUIDType },
      },
      resolve: async (_obj, { id }: Post, { prisma }: Context) => {
        const post = await prisma.post.findUnique({ where: { id } });
        return post;
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_obj, _args, { prisma }: Context) => {
        const posts = await prisma.post.findMany();
        return posts;
      },
    },
    profile: {
      type: ProfileType,
      args: {
        id: { type: UUIDType },
      },
      resolve: async (_obj, { id }: Profile, { prisma }: Context) => {
        const profile = await prisma.profile.findUnique({ where: { id } });
        return profile;
      },
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_obj, _args, { prisma }: Context) => {
        const profiles = await prisma.profile.findMany();
        return profiles;
      },
    }
  },
})