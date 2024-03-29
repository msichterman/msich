import { withContentlayer } from "next-contentlayer";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return withContentlayer(config);
}

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
  pageExtensions: ["tsx", "ts", "mdx", "md"],
  webpack: (config) => {
    config.infrastructureLogging = {
      level: "error",
    };

    return config;
  },
});
