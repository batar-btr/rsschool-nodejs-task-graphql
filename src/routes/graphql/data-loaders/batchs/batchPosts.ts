import { Post, PrismaClient } from '@prisma/client';


export const batchPosts = (prisma: PrismaClient) => async (ids: readonly string[]) => {
  const posts = await prisma.post.findMany({
    where: { authorId: { in: ids as string[] } },
  });

  const reducePosts = posts.reduce((a, post) => {
    if(a[post.authorId]) {
      a[post.authorId].push(post);
    } else {
      a[post.authorId] = [post]
    }
    return a;
  }, {} as Record<string, Post[]>);

  return ids.map(id => reducePosts[id]);
};
