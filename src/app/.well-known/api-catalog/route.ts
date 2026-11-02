import { DOCUMENT_CACHE, REVALIDATE_SECONDS } from "@/data/profile";
import { apiCatalog } from "@/lib/agent-content";

export const revalidate = REVALIDATE_SECONDS;

export function GET() {
  return Response.json(apiCatalog(), {
    headers: {
      "content-type": "application/linkset+json; charset=utf-8",
      "cache-control": DOCUMENT_CACHE,
    },
  });
}
