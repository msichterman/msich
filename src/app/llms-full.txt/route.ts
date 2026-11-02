import { DOCUMENT_CACHE, REVALIDATE_SECONDS } from "@/data/profile";
import { llmsFullTxt } from "@/lib/agent-content";

export const revalidate = REVALIDATE_SECONDS;

export function GET() {
  return new Response(llmsFullTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": DOCUMENT_CACHE,
    },
  });
}
