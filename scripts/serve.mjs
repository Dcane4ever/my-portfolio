import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, relative, isAbsolute } from "node:path";
import { gzipSync } from "node:zlib";
const root = resolve(import.meta.dirname, "../dist");
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, `http://127.0.0.1:${port}`).pathname,
    );
    const path = resolve(root, `.${pathname}`);
    const local = relative(root, path);
    if (local.startsWith("..") || isAbsolute(local)) {
      res.writeHead(403).end();
      return;
    }
    const info = await stat(path);
    const file = info.isDirectory() ? resolve(path, "index.html") : path;
    const type = mime[extname(file)] || "application/octet-stream";
    const raw = await readFile(file);
    const compressed =
      /text\/|application\/(xml|json)/.test(type) &&
      /gzip/.test(req.headers["accept-encoding"] || "");
    res.writeHead(200, {
      "Content-Type": type,
      "Cache-Control": "no-cache",
      Vary: "Accept-Encoding",
      ...(compressed && { "Content-Encoding": "gzip" }),
    });
    res.end(compressed ? gzipSync(raw) : raw);
  } catch {
    res.writeHead(404).end("Not found");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Local: http://127.0.0.1:${port}`),
);
