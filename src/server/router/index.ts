// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { protectedExampleRouter } from "./protected-example-router";
import { newsletterRouter } from "./newsletter";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("newsletter.", newsletterRouter)
  .merge("auth.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
