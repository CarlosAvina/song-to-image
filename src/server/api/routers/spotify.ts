import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { GetTrackResponseType } from "~/server/api/types";

export const spotifyRouter = createTRPCRouter({
  getTrack: publicProcedure
    .input(z.object({ songId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const res = await fetch(
        `https://api.spotify.com/v1/tracks/${input.songId}`,
        {
          headers: {
            Authorization: `Bearer ${ctx.spotifyAccessToken ?? ""}`,
          },
        }
      );

      const data = (await res.json()) as GetTrackResponseType;

      return data;
    }),
});
