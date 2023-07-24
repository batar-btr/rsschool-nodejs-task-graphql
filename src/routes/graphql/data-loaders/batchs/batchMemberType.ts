import { MemberType, PrismaClient } from '@prisma/client';
import { MemberTypeId } from '../../../member-types/schemas.js';

export const batchGetMemberType = (prisma: PrismaClient) => async (ids: readonly MemberTypeId[]) => {
  const memberTypes = await prisma.memberType.findMany({
    where: { id: { in: ids as MemberTypeId[] } }
  });

  const sortedMemberType = ids.map(id => memberTypes.find(x => x.id === id)) as MemberType[];

  return sortedMemberType;

};
