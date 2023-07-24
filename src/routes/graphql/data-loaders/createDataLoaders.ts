import { MemberType, Post, PrismaClient, Profile, User } from '@prisma/client';
import DataLoader from 'dataloader';
import { batchUserById } from './batchs/batchUserById.js';
import { batchPosts } from './batchs/batchPosts.js';
import { batchProfile } from './batchs/batchProfile.js';
import { batchGetMemberType } from './batchs/batchMemberType.js';
import { batchUserSubs } from './batchs/batchUserSubs.js';
import { batchSubsToUser } from './batchs/batchSubsToUser.js';

export interface DataLoaders {
  userLoader: DataLoader<string, User>;
  profileLoader: DataLoader<string, Profile>;
  postsLoader: DataLoader<string, Post[]>;
  memberTypeLoader: DataLoader<string, MemberType>;
  userSubs: DataLoader<string, User[]>;
  subsToUser: DataLoader<string, User[]>;
}

export const createDataLoaders = (prisma: PrismaClient): DataLoaders => {
  return {
    userLoader: new DataLoader(batchUserById(prisma)),
    profileLoader: new DataLoader(batchProfile(prisma)),
    postsLoader: new DataLoader(batchPosts(prisma)),
    memberTypeLoader: new DataLoader(batchGetMemberType(prisma)),
    userSubs: new DataLoader(batchUserSubs(prisma)),
    subsToUser: new DataLoader(batchSubsToUser(prisma))
  }
}