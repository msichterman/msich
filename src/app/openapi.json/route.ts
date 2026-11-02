import { DOCUMENT_CACHE, REVALIDATE_SECONDS } from "@/data/profile";
import { openApiDocument } from "@/lib/agent-content";

export const revalidate = REVALIDATE_SECONDS;

export function GET() {
  return Response.json(openApiDocument(), {
    headers: {
      "content-type": "application/openapi+json; charset=utf-8",
      "cache-control": DOCUMENT_CACHE,
    },
  });
}
