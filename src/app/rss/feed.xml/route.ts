import { DOCUMENT_CACHE, REVALIDATE_SECONDS } from "@/data/profile";
import { rssXml } from "@/lib/agent-content";

export const revalidate = REVALIDATE_SECONDS;

export function GET() {
  return new Response(rssXml(), {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": DOCUMENT_CACHE,
    },
  });
}
