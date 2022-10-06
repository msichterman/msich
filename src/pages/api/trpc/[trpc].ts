// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/trpc/router";
import { createContext } from "../../../server/trpc/context";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  responseMeta({ ctx, paths, type, errors }) {
    // assuming you have all your public routes with the keyword `public` in them
    const allPublic = paths && paths.every((path) => path.includes("public"));
    // checking that no procedures errored
    const allOk = errors.length === 0;
    // checking we're doing a query request
    const isQuery = type === "query";
    // @ts-expect-error
    if (ctx?.res && allPublic && allOk && isQuery) {
      return {
        headers: {
          "cache-control": `public, s-maxage=1200, stale-while-revalidate=600`,
        },
      };
    }
    return {};
  },
});
