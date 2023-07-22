import { GraphQLObjectType, GraphQLList, GraphQLNonNull } from 'graphql';
import { Context } from '../index.js';
import { UUIDType } from '../types/uuid.js';
import { UserType } from '../types/user.js';
import { MemberIDGqlEnumType, MemberType } from '../types/member-type.js';
import { MemberTypeId } from '../../member-types/schemas.js';

export const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: UUIDType
        }
      },
      resolve: async (obj, args: { id: string }, context: Context) => {
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
      resolve: async (obj, args, context: Context) => {
        const { prisma } = context;
        return await prisma.user.findMany();
      }
    },
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (obj, args, context: Context) => {
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
      resolve: async (obj, args: { id: MemberTypeId }, context: Context) => {
        const { prisma } = context;
        const { id } = args;
        const memberType = await prisma.memberType.findUnique({
          where: {
            id
          },
        });
        return memberType;
      }
    }
  },
})