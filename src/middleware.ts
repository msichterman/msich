import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DOCUMENT_CACHE } from "@/data/profile";

function isRsc(request: NextRequest): boolean {
  if (request.nextUrl.searchParams.has("_rsc")) return true;
  if (request.headers.get("rsc")) return true;
  const accept = request.headers.get("accept") ?? "";
  return accept.includes("text/x-component");
}

function contentPath(pathname: string): string {
  let path = pathname.replace(/\/+$/, "") || "/";
  if (path.endsWith(".md")) path = path.slice(0, -3) || "/";
  if (path === "/index") path = "/";
  return path;
}

function isPagePath(pathname: string): boolean {
  if (pathname.startsWith("/api") || pathname.startsWith("/agent-md")) return false;
  const leaf = pathname.split("/").filter(Boolean).pop() ?? "";
  if (!leaf) return true;
  if (leaf.endsWith(".md")) return true;
  return !leaf.includes(".");
}

function wantsMarkdown(request: NextRequest): boolean {
  if (isRsc(request)) return false;
  if (request.method !== "GET" && request.method !== "HEAD") return false;
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/agent-md") || pathname.startsWith("/api")) return false;
  if (pathname.endsWith(".md") || pathname.endsWith(".md/")) return true;
  const accept = request.headers.get("accept") ?? "";
  if (!accept.toLowerCase().includes("text/markdown")) return false;
  return isPagePath(pathname);
}

function toAgentPath(pathname: string): string {
  const path = contentPath(pathname);
  return path === "/" ? "/agent-md" : `/agent-md${path}`;
}

function discoveryLink(pathname: string): string {
  const path = contentPath(pathname);
  const md = path === "/" ? "/index.md" : `${path}.md`;
  return [
    `</.well-known/api-catalog>; rel="api-catalog"`,
    `</llms.txt>; rel="describedby"; type="text/plain"`,
    `</sitemap.xml>; rel="sitemap"`,
    `<${md}>; rel="alternate"; type="text/markdown"`,
  ].join(", ");
}

export function middleware(request: NextRequest) {
  if (wantsMarkdown(request)) {
    const url = request.nextUrl.clone();
    url.pathname = toAgentPath(request.nextUrl.pathname);
    const response = NextResponse.rewrite(url);
    response.headers.set("Cache-Control", DOCUMENT_CACHE);
    response.headers.append("Vary", "Accept");
    return response;
  }

  const response = NextResponse.next();
  if (!isRsc(request) && isPagePath(request.nextUrl.pathname)) {
    response.headers.set("Link", discoveryLink(request.nextUrl.pathname));
    response.headers.append("Vary", "Accept");
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!api/|_next/static|_next/image|fonts/|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff2|css|js|map)$).*)",
  ],
};
