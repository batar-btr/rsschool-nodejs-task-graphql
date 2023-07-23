import { GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLInputObjectType } from 'graphql';
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
      resolve: async ({ memberTypeId }: Profile, _args, { loaders }: Context) => {
        return await loaders.memberTypeLoader.load(memberTypeId);
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

export const changeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberIDGqlEnumType },
  },
});