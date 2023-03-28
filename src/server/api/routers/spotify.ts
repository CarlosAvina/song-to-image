import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const spotifyRouter = createTRPCRouter({
  getTrack: publicProcedure
    .input(z.object({ songId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const res = await fetch(
        `https://api.spotify.com/v1/tracks/${input.songId}`,
        {
          headers: {
            Authorization: `Bearer ${ctx.spotifyAccessToken}`,
          },
        }
      );

      const json = (await res.json()) as object;

      return json;
    }),
});
