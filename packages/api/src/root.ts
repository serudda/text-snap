import { aiRouter } from './router/ai';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  ai: aiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
