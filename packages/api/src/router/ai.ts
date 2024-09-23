import {
  condenseHandler,
  dispatchFormatHandler,
  emojiHandler,
  formalityHandler,
  grammarHandler,
  improveHandler,
  translateHandler,
} from '../controllers/ai.controller';
import {
  condenseInput,
  dispatchFormatInput,
  emojiInput,
  formalityInput,
  grammarInput,
  improveInput,
  translateInput,
} from '../schema/ai.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const aiRouter = createTRPCRouter({
  dispatchFormat: publicProcedure
    .input(dispatchFormatInput)
    .mutation(async ({ ctx, input }) => dispatchFormatHandler({ ctx, input })),

  grammar: publicProcedure.input(grammarInput).query(async ({ ctx, input }) => grammarHandler({ ctx, input })),

  improve: publicProcedure.input(improveInput).query(async ({ ctx, input }) => improveHandler({ ctx, input })),

  formality: publicProcedure.input(formalityInput).query(async ({ ctx, input }) => formalityHandler({ ctx, input })),

  translate: publicProcedure.input(translateInput).query(async ({ ctx, input }) => translateHandler({ ctx, input })),

  emoji: publicProcedure.input(emojiInput).query(async ({ ctx, input }) => emojiHandler({ ctx, input })),

  condense: publicProcedure.input(condenseInput).query(async ({ ctx, input }) => condenseHandler({ ctx, input })),
});
