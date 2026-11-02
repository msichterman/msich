import { DOCUMENT_CACHE, REVALIDATE_SECONDS } from "@/data/profile";
import { llmsTxt } from "@/lib/agent-content";

export const revalidate = REVALIDATE_SECONDS;

export function GET() {
  return new Response(llmsTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": DOCUMENT_CACHE,
    },
  });
}
