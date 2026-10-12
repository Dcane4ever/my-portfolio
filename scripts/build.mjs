import { build, transform } from "esbuild";
import { renderToString } from "react-dom/server";
import React from "react";
import sharp from "sharp";
import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
import { resolve, join, relative, isAbsolute } from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { content as c, isPlaceholder, isWebUrl } from "../js/content.js";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");
const assets = join(dist, "assets");
const work = join(root, ".build");
await mkdir(assets, { recursive: true });
await mkdir(work, { recursive: true });
const siteUrl = new URL(c.settings.siteUrl);
if (!["http:", "https:"].includes(siteUrl.protocol))
  throw new Error("settings.siteUrl must be an HTTP(S) URL.");
if (!siteUrl.pathname.endsWith("/"))
  throw new Error("settings.siteUrl must end with a slash.");
if (c.settings.formEndpoint && !isWebUrl(c.settings.formEndpoint))
  throw new Error("formEndpoint must be empty or an HTTP(S) URL.");
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const url = (path) => new URL(path, siteUrl).href;

await build({
  entryPoints: [join(root, "js/app-gh-pages.jsx")],
  outfile: join(assets, "app.js"),
  bundle: true,
  minify: true,
  target: ["es2020"],
  define: { "process.env.NODE_ENV": '"production"' },
  legalComments: "none",
});
await build({
  entryPoints: [join(root, "js/app.jsx")],
  outfile: join(work, "app-server.mjs"),
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  define: { "process.env.NODE_ENV": '"production"' },
});
const { default: App } = await import(
  pathToFileURL(join(work, "app-server.mjs"))
);
const html = renderToString(React.createElement(App));

const notices = await Promise.all(
  ["react", "react-dom", "@fontsource-variable/geist"].map(
    async (name) =>
      `${name}\n${await readFile(join(root, "node_modules", name, "LICENSE"), "utf8")}`,
  ),
);
await writeFile(join(assets, "third-party-licenses.txt"), notices.join("\n\n"));

execFileSync(
  process.execPath,
  [
    join(root, "node_modules/tailwindcss/lib/cli.js"),
    "-c",
    join(root, "tailwind.config.cjs"),
    "-i",
    join(root, "css/index.css"),
    "-o",
    join(work, "site.css"),
  ],
  { cwd: root, stdio: "pipe" },
);
const css = await transform(await readFile(join(work, "site.css"), "utf8"), {
  loader: "css",
  minify: true,
});
await writeFile(join(assets, "site.css"), css.code);
await copyFile(
  join(
    root,
    "node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2",
  ),
  join(assets, "geist-latin.woff2"),
);

for (const item of c.work.items) {
  const source = join(root, item.image.source);
  const metadata = await sharp(source).metadata();
  if (
    metadata.width !== item.image.width ||
    metadata.height !== item.image.height
  )
    throw new Error(
      `Correct the image dimensions in content.js: ${item.id} (${metadata.width}×${metadata.height}).`,
    );
  for (const width of [480, 960]) {
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(join(assets, `${item.id}-${width}.webp`));
  }
}
if (!isPlaceholder(c.identity.photo.src)) {
  if (isWebUrl(c.identity.photo.src))
    throw new Error("Use a local photo path so it can be optimized.");
  const source = resolve(root, c.identity.photo.src);
  const photoRelative = relative(root, source);
  if (photoRelative.startsWith("..") || isAbsolute(photoRelative))
    throw new Error("Photo must be inside this repository.");
  const destination = resolve(dist, c.identity.photo.src);
  const destinationRelative = relative(dist, destination);
  if (destinationRelative.startsWith("..") || isAbsolute(destinationRelative))
    throw new Error("Photo output must stay inside dist.");
  const metadata = await sharp(source).metadata();
  if (
    metadata.width !== c.identity.photo.width ||
    metadata.height !== c.identity.photo.height
  )
    throw new Error(
      "Set identity.photo.width and height to the photo’s actual dimensions.",
    );
  await mkdir(resolve(destination, ".."), { recursive: true });
  // Output format follows the configured file extension. Prefer a WebP photo path.
  await sharp(source)
    .resize({ width: 720, withoutEnlargement: true })
    .toFile(destination);
}

const preview = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#101112"/><rect x="74" y="74" width="66" height="7" rx="3" fill="#c72c35"/><text x="74" y="132" fill="#b5b6bb" font-size="30" font-family="Arial,sans-serif">${escape(c.identity.shortName)}</text><text x="74" y="263" fill="#f4f3ef" font-size="64" font-family="Arial,sans-serif" font-weight="bold">${escape(c.footer.line.split(". ")[0])}.</text><text x="74" y="345" fill="#f4f3ef" font-size="54" font-family="Arial,sans-serif">${escape(c.footer.line.split(". ").slice(1).join(". "))}</text><text x="74" y="447" fill="#b5b6bb" font-size="29" font-family="Arial,sans-serif">${escape(c.seo.serviceType[0])}</text><text x="74" y="493" fill="#b5b6bb" font-size="29" font-family="Arial,sans-serif">${escape(c.seo.serviceType[1])}</text><text x="74" y="564" fill="#ff9196" font-size="27" font-family="Arial,sans-serif">${escape(c.nav.cta)} · ${escape(c.identity.location)}</text></svg>`;
await sharp(Buffer.from(preview)).png().toFile(join(dist, c.seo.previewImage));
await writeFile(
  join(assets, "favicon.svg"),
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#101112"/><path d="m13 18 8 27 8-27M36 45V18h9a8 8 0 0 1 0 16h-9" fill="none" stroke="#f4f3ef" stroke-width="5"/><circle cx="54" cy="46" r="4" fill="#c72c35"/></svg>',
);

const sameAs = [c.identity.github, c.identity.linkedin].filter(isWebUrl);
const person = {
  "@type": "Person",
  "@id": url("#person"),
  name: c.identity.name,
  url: siteUrl.href,
  email: c.identity.email,
  ...(sameAs.length && { sameAs }),
  ...(isPlaceholder(c.identity.photo.src)
    ? {}
    : { image: url(c.identity.photo.src) }),
};
const service = {
  "@type": "ProfessionalService",
  "@id": url("#service"),
  name: c.seo.serviceName,
  description: c.seo.description,
  url: siteUrl.href,
  image: url(c.seo.previewImage),
  email: c.identity.email,
  founder: { "@id": url("#person") },
  address: {
    "@type": "PostalAddress",
    addressLocality: c.identity.address.locality,
    addressCountry: c.identity.address.country,
  },
  areaServed: c.identity.location,
  knowsAbout: c.seo.serviceType,
};
const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [person, service],
}).replace(/</g, "\\u003c");
const head = `<title>${escape(c.seo.title)}</title>
    <meta name="description" content="${escape(c.seo.description)}" />
    <link rel="canonical" href="${escape(siteUrl.href)}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_PH" />
    <meta property="og:site_name" content="${escape(c.identity.shortName)}" />
    <meta property="og:title" content="${escape(c.seo.title)}" />
    <meta property="og:description" content="${escape(c.seo.description)}" />
    <meta property="og:url" content="${escape(siteUrl.href)}" />
    <meta property="og:image" content="${escape(url(c.seo.previewImage))}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escape(c.seo.previewAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(c.seo.title)}" />
    <meta name="twitter:description" content="${escape(c.seo.description)}" />
    <meta name="twitter:image" content="${escape(url(c.seo.previewImage))}" />
    <meta name="twitter:image:alt" content="${escape(c.seo.previewAlt)}" />
    <script type="application/ld+json">${jsonLd}</script>`;
const template = await readFile(join(root, "index.html"), "utf8");
await writeFile(
  join(dist, "index.html"),
  template
    .replace("<!-- SEO_HEAD -->", head)
    .replace("<!-- APP_HTML -->", html),
);
await writeFile(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(siteUrl.href)}</loc></url></urlset>\n`,
);
await writeFile(
  join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${url("sitemap.xml")}\n`,
);
await writeFile(join(dist, ".nojekyll"), "");
console.log(
  "Built React + Tailwind production site in dist/ with static HTML, optimized images, local font, and SEO files.",
);
