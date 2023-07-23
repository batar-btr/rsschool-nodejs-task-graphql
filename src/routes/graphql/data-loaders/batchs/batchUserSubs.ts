import { PrismaClient, User } from '@prisma/client';


export const batchUserSubs = (prisma: PrismaClient) => async (ids: readonly string[]) => {
  const users = await prisma.user.findMany({
    where: {
      subscribedToUser: {
        some: {
          subscriberId: { in: ids as string[] },
        },
      },
    },
  });

  return ids.map(() => users);
};