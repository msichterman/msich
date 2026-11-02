/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "ts", "mdx", "md"],
  // Put generateMetadata in the initial <head> for every client, including
  // AI crawlers and Lighthouse, instead of streaming it into the body.
  htmlLimitedBots: ".*",
};

export default config;
