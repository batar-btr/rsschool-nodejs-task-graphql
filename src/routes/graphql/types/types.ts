import { Post, Profile, User } from '@prisma/client';

export interface ChangeArgs {
  id: string;
  dto: Profile | Post | User
}