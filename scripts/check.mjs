import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { content, isPlaceholder } from "../js/content.js";
const root = resolve(import.meta.dirname, "..");
const html = await readFile(resolve(root, "dist/index.html"), "utf8");
assert.equal(
  await readFile(resolve(root, "index.html"), "utf8"),
  html,
  "The GitHub Pages entry must contain the rendered production page",
);
assert(
  !/<!-- (APP_HTML|SEO_HEAD) -->/.test(html),
  "An unresolved build template must never be deployed",
);
for (const file of [
  "index.html",
  "robots.txt",
  "sitemap.xml",
  ".nojekyll",
  ...(await readdir(resolve(root, "dist/assets"))).map(
    (name) => `assets/${name}`,
  ),
]) {
  assert.deepEqual(
    await readFile(resolve(root, file)),
    await readFile(resolve(root, "dist", file)),
    `GitHub Pages artifact is missing or stale: ${file}`,
  );
}
assert(
  !/AEGIS|\bEAC\b|Emilio Aguinaldo|particle|carousel/i.test(html),
  "Employer content or removed effects found in the output",
);
assert(html.includes(content.hero.title));
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert.equal(
  html.includes("client-stats"),
  content.stats.some((stat) => !isPlaceholder(stat.value)),
  "Only real stats should render",
);
assert.equal(
  html.includes("testimonials-title"),
  content.testimonials.items.some(
    (item) =>
      item.quote &&
      item.name &&
      !isPlaceholder(item.quote) &&
      !isPlaceholder(item.name),
  ),
  "Only real testimonials should render",
);
assert(
  !/\[ADD[^\]]*\]/i.test(html),
  "Unfinished content must not appear in the public page",
);
assert(
  !/\[ADD[^\]]*\]/i.test(JSON.stringify(content)),
  "Unfinished content must not remain in the content config",
);
const schema = JSON.parse(
  html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
);
assert.deepEqual(
  schema["@graph"].map((item) => item["@type"]),
  ["Person", "ProfessionalService"],
);
for (const file of [
  "robots.txt",
  "sitemap.xml",
  "assets/social-preview.png",
  "assets/site.css",
  "assets/app.js",
  "assets/geist-latin.woff2",
])
  assert((await stat(resolve(root, "dist", file))).size > 0);
assert.equal(
  (await readdir(resolve(root, "dist/assets"))).filter((file) =>
    /EAC|AEGIS/i.test(file),
  ).length,
  0,
);
const { validateInquiry, Testimonials } = await import(
  pathToFileURL(resolve(root, ".build/app-server.mjs"))
);
assert.equal(Object.keys(validateInquiry({})).length, 6);
const values = {
  name: "School Administrator",
  email: "office@example.org",
  organization: "School",
  need: "Attendance records",
  budget: content.contact.fields.find((field) => field.name === "budget")
    .options[0],
  timeline: content.contact.fields.find((field) => field.name === "timeline")
    .options[0],
};
assert.deepEqual(validateInquiry(values), {});
assert(validateInquiry({ ...values, email: "invalid" }).email);
assert(validateInquiry({ ...values, name: "   " }).name);
assert(validateInquiry({ ...values, budget: "unexpected" }).budget);
assert(validateInquiry({ ...values, need: "a".repeat(4001) }).need);
if (!content.testimonials.items.length)
  assert.equal(renderToStaticMarkup(React.createElement(Testimonials)), "");
console.log(
  "Content safety, SEO output, empty states, and inquiry validation checks passed.",
);
