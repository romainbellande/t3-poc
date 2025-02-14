import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { posts } from "~/server/db/schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insertInto('post').values({
        name: input.name,
        created_by: ctx.session.user.id,
      }).executeTakeFirst();
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.selectFrom('post').selectAll().orderBy('created_at', 'desc').executeTakeFirst();

    return post ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
