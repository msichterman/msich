import { join } from "node:path";
import { pathToFileURL } from "node:url";

// Import the vinext RSC handler (Web Request → Response)
const serverPath = join(process.cwd(), "dist", "server", "index.js");
const mod = await import(pathToFileURL(serverPath).href);
const rscHandler = mod.default;

export default async function handler(req, res) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host =
    req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const url = new URL(req.url, `${protocol}://${host}`);

  // Convert Node.js headers to Web Headers
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value != null) {
      headers.set(key, Array.isArray(value) ? value.join(", ") : String(value));
    }
  }

  // Build Web Request
  const init = { method: req.method, headers };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req;
    init.duplex = "half";
  }
  const webRequest = new Request(url.href, init);

  // Call vinext handler
  const response = await rscHandler(webRequest);

  // Stream Web Response back to Node.js
  const respHeaders = {};
  response.headers.forEach((value, key) => {
    respHeaders[key] = value;
  });
  res.writeHead(response.status, respHeaders);

  if (response.body) {
    const reader = response.body.getReader();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  }
  res.end();
}
