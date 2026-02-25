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
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-dom/client",
      ],
      exclude: [
        "fumadocs-core",
        "fumadocs-ui",
        "fumadocs-mdx",
      ],
    },
    resolve: {
      dedupe: [
        "fumadocs-core",
        "fumadocs-ui",
      ],
    },
    ssr: {
      noExternal: [
        "fumadocs-core",
        "fumadocs-ui",
        "fumadocs-mdx",
      ],
    },
    build: {
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          // Suppress sourcemap warnings from vinext "use client" transform
          if (warning.message?.includes("Can't resolve original location of error")) return;
          // Suppress vinext internal dynamic/static import warning
          if (warning.message?.includes("is dynamically imported by") && warning.message?.includes("vinext")) return;
          defaultHandler(warning);
        },
      },
    },
    plugins: [mdx(MdxConfig), vinext()],
  };
});
