import { PrismaClient, Profile } from '@prisma/client';

export const batchProfile = (prisma: PrismaClient) => async (ids: readonly string[]) => {
  const profiles = await prisma.profile.findMany({
    where: { userId: { in: ids as string[] } },
  });

  const sortedProfiles = ids.map(id => profiles.find(x => x.userId === id)) as Profile[];

  return sortedProfiles;
  
};