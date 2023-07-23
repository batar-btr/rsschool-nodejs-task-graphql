import { GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLInputObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';

import { Context } from '../index.js';
import { Profile } from '@prisma/client';
import { MemberIDGqlEnumType, MemberType } from './member-type.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'Profile data',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberIDGqlEnumType },
    memberType: {
      type: MemberType,
      resolve: async ({ memberTypeId }: Profile, _args, { prisma }: Context) => {
        return await prisma.memberType.findUnique({ where: { id: memberTypeId } });
      }
    }
  })
})

export const createProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberIDGqlEnumType },
  },
});