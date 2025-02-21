/**
 * This file contains the router for the user module.
 */

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        authorId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insertInto("products").values(input).executeTakeFirst();
    }),
});
