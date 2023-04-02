import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure.query(async ({ ctx }) => {
    const { prisma, userId } = ctx;

    if (!userId) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
      });
    }

    const user = await prisma.user.upsert({
      create: { id: userId },
      update: { id: userId },
      where: { id: userId },
    });

    return Boolean(user);
  }),
});
