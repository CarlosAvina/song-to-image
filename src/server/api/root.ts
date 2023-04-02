import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { spotifyRouter } from "~/server/api/routers/spotify";
import { userRouter } from "~/server/api/routers/user";
import { postRouter } from "~/server/api/routers/post";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  spotify: spotifyRouter,
  user: userRouter,
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
