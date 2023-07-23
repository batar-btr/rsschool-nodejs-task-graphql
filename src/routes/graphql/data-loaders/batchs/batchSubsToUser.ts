import { PrismaClient } from '@prisma/client';


export const batchSubsToUser = (prisma: PrismaClient) => async (ids: readonly string[]) => {
  const users = await prisma.user.findMany({
    where: {
      userSubscribedTo: {
        some: {
          authorId: { in: ids as string[] },
        },
      },
    },
  });

  return ids.map(() => users);
};