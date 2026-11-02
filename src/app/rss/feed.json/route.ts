import { DOCUMENT_CACHE, REVALIDATE_SECONDS } from "@/data/profile";
import { feedJson } from "@/lib/agent-content";

export const revalidate = REVALIDATE_SECONDS;

export function GET() {
  return new Response(feedJson(), {
    headers: {
      "content-type": "application/feed+json; charset=utf-8",
      "cache-control": DOCUMENT_CACHE,
    },
  });
}
