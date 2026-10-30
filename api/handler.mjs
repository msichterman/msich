import { join } from "node:path";
import { pathToFileURL } from "node:url";

// Vinext's production server entry. Vercel serves dist/client as static files
// and rewrites everything else here. Import by file URL so Node does not
// evaluate the bundle twice (see vinext prod-server).
const serverPath = join(process.cwd(), "dist", "server", "index.js");
const mod = await import(pathToFileURL(serverPath).href);
const rscHandler = mod.default;

export default async function handler(req, res) {
  try {
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host =
      req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const url = new URL(req.url || "/", `${protocol}://${host}`);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value == null) continue;
      if (Array.isArray(value)) {
        for (const item of value) headers.append(key, item);
      } else {
        headers.set(key, String(value));
      }
    }

    const init = { method: req.method, headers };
    if (req.method !== "GET" && req.method !== "HEAD") {
      init.body = req;
      init.duplex = "half";
    }
    const response = await rscHandler(new Request(url.href, init));

    const respHeaders = {};
    response.headers.forEach((value, key) => {
      const existing = respHeaders[key];
      if (existing === undefined) respHeaders[key] = value;
      else if (Array.isArray(existing)) existing.push(value);
      else respHeaders[key] = [existing, value];
    });
    res.writeHead(response.status, respHeaders);

    if (req.method === "HEAD" || !response.body) {
      res.end();
      return;
    }

    const reader = response.body.getReader();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
    res.end();
  } catch (error) {
    console.error("[msich] request failed", error);
    if (!res.headersSent) {
      res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    }
    res.end("Internal Server Error");
  }
}
