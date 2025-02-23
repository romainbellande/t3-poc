/**
 * This file contains the router for the user module.
 */

import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import { core } from '~/awilix.config';
import { createProductSchema, updateProductSchema } from './product.zod';
export const productRouter = createTRPCRouter({
  create: protectedProcedure.input(createProductSchema).mutation(async ({ input, ctx }) => {
    return core.productService.create({
      ...input,
      authorId: ctx.session.user.id,
    });
  }),

  findMany: protectedProcedure.query(async () => {
    return core.productService.findMany();
  }),

  findById: protectedProcedure.input(z.string()).query(async ({ input }) => {
    return core.productService.findById(input);
  }),

  update: protectedProcedure.input(updateProductSchema).mutation(async ({ input }) => {
    return core.productService.update(input.id, input);
  }),

  delete: protectedProcedure.input(z.string()).mutation(async ({ input }) => {
    return core.productService.delete(input);
  }),
});
