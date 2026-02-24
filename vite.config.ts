import vinext from "vinext";
import mdx from "fumadocs-mdx/vite";
import { defineConfig, loadEnv } from "vite";
import * as MdxConfig from "./source.config";

export default defineConfig(({ mode }) => {
  // Load all env vars from .env* files into process.env
  // so they're available in the Vite module runner (RSC environment)
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    envPrefix: ["NEXT_PUBLIC_", "VITE_"],
    define: {
      "process.env.NEXT_PUBLIC_SITE_URL": JSON.stringify(
        env.NEXT_PUBLIC_SITE_URL,
      ),
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
    plugins: [mdx(MdxConfig), vinext()],
  };
});
