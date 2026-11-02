import { DOCUMENT_CACHE, REVALIDATE_SECONDS } from "@/data/profile";
import { sitemapXml } from "@/lib/agent-content";

export const revalidate = REVALIDATE_SECONDS;

export function GET() {
  return new Response(sitemapXml(), {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": DOCUMENT_CACHE,
    },
  });
}
