import { DOCUMENT_CACHE, REVALIDATE_SECONDS } from "@/data/profile";
import { estimateTokens, markdownForPath } from "@/lib/agent-content";

export const revalidate = REVALIDATE_SECONDS;

type Params = { params: Promise<{ slug?: string[] }> };

export async function GET(_request: Request, props: Params) {
  const { slug } = await props.params;
  const path = slug && slug.length > 0 ? `/${slug.join("/")}` : "/";
  const markdown = markdownForPath(path);
  if (!markdown) {
    return new Response("Not found\n", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(markdown, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(estimateTokens(markdown)),
      vary: "Accept",
      "cache-control": DOCUMENT_CACHE,
    },
  });
}
