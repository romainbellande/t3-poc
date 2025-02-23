/**
 * This file contains the router for the user module.
 */

import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import { container } from '~/awilix.config';

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
    .mutation(async ({ input, ctx }) => {
      return container.cradle.productService.create({
        ...input,
        authorId: ctx.session.user.id,
      });
    }),

  findMany: protectedProcedure.query(async () => {
    return container.cradle.productService.findMany();
  }),

  findById: protectedProcedure.input(z.string()).query(async ({ input }) => {
    return container.cradle.productService.findById(input);
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return container.cradle.productService.update(input.id, input);
    }),

  delete: protectedProcedure.input(z.string()).mutation(async ({ input }) => {
    return container.cradle.productService.delete(input);
  }),
});
