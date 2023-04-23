// src/server/trpc/router/index.ts
import { router } from "../trpc";
import { newsletterRouter } from "./newsletter";
import { authRouter } from "./auth";
import { messageRouter } from "./message";
import { metricRouter } from "./metric";

export const appRouter = router({
  newsletter: newsletterRouter,
  message: messageRouter,
  auth: authRouter,
  metric: metricRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
