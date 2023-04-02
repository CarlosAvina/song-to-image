import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  createPost: publicProcedure
    .input(
      z.object({
        songId: z.string(),
        songName: z.string(),
        songUri: z.string(),
        previewUrl: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { songId, songName, songUri, previewUrl } = input;
      const { prisma, userId } = ctx;

      const defaultImage =
        "https://i.scdn.co/image/ab67616d0000b2737359994525d219f64872d3b1";

      if (!userId) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
        });
      }

      const newPost = await prisma.song
        .upsert({
          create: { id: songId, songName, songUri, previewUrl },
          update: { id: songId, songName, songUri, previewUrl },
          where: { id: songId },
        })
        .then(async (song) => {
          const prompt = `generate an image that represents a song called "${songName}"`;
          const post = await prisma.post.create({
            data: { userId, image: defaultImage, songId: song.id, prompt },
          });

          return post;
        });

      return {
        post: newPost,
      };
    }),
  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;

    const posts = await prisma.post.findMany();

    return { posts };
  }),
  getPostById: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const postInfo = await prisma.post.findUnique({
        where: {
          id: input.postId,
        },
        include: {
          song: true,
          User: true,
        },
      });

      return { postInfo };
    }),
});
