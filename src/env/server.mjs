// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { serverSchema } from "./schema.mjs";
import { env as clientEnv, formatErrors } from "./client.mjs";

const _serverEnv = serverSchema.safeParse(process.env);

if (
  _serverEnv.success === false &&
  process.env.SKIP_ENV_VALIDATION !== "true" &&
  // App Router evaluates route handlers at build time — skip validation during build
  process.env.NEXT_PHASE !== "phase-production-build"
) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(_serverEnv.error.format()),
  );
  throw new Error("Invalid environment variables");
}

/**
 * Validate that server-side environment variables are not exposed to the client.
 */
if (_serverEnv.data) {
  for (let key of Object.keys(_serverEnv.data)) {
    if (key.startsWith("NEXT_PUBLIC_")) {
      console.warn("❌ You are exposing a server-side env-variable:", key);

      throw new Error("You are exposing a server-side env-variable");
    }
  }
}

export const env = { ...(_serverEnv.data ?? {}), ...clientEnv };
