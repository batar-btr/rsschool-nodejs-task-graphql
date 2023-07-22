import { GraphQLObjectType } from 'graphql';
import { NewUser, Context } from '../index.js';
import { CreateUserType, UserType } from '../types/user.js';

export const mutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createUser: {
      type: UserType,
      args: {
        newUser: { type: CreateUserType }
      },
      resolve(obj, args: {newUser: NewUser}, context: Context) {
        const { prisma } = context;
        const { newUser } = args;
        return prisma.user.create({
          data: newUser
        });
      }
    }
  }
})