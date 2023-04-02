import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        username: z.string().optional().nullable(),
        profileImage: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { username, profileImage } = input;
      const { prisma, userId } = ctx;

      let user;
      if (userId && username && profileImage) {
        user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
          await prisma.user.create({
            data: { id: userId, username, profileImage },
          });
        }
      }

      return Boolean(user);
    }),
});
