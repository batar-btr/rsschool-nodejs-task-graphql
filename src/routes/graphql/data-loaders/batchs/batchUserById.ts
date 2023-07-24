import { PrismaClient, User } from '@prisma/client';


export const batchUserById = (prisma: PrismaClient) => async (ids: readonly string[]) => {
  const users = await prisma.user.findMany({
    where: { id: { in: ids as string[] } },
    include: {
      userSubscribedTo: true,
      subscribedToUser: true,
    },
  });

  const sortedUsers = ids.map(id => users.find(x => x.id === id)) as User[];

  return sortedUsers;
};