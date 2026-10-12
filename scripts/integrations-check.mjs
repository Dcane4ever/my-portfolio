import assert from "node:assert/strict";
import { build } from "esbuild";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import React from "react";
import { renderToString } from "react-dom/server";
import { chromium } from "playwright-core";
const root = resolve(import.meta.dirname, "..");
// Test-only config overrides; the production content file is never changed.
const plugin = {
  name: "test-config",
  setup(builder) {
    builder.onLoad({ filter: /content\.js$/ }, async (args) => ({
      contents: `${await readFile(args.path, "utf8")}\ncontent.settings.formEndpoint = 'https://inquiry.invalid/submit';\ncontent.settings.calendarUrl = 'https://calendar.invalid/book';\ncontent.settings.analytics = { enabled: true, domain: 'site.invalid', scriptUrl: 'https://analytics.invalid/script.js' };`,
      loader: "js",
    }));
  },
};
const client = await build({
  absWorkingDir: root,
  entryPoints: ["js/app-gh-pages.jsx"],
  bundle: true,
  write: false,
  minify: true,
  define: { "process.env.NODE_ENV": '"production"' },
  plugins: [plugin],
});
const server = resolve(root, ".build/integration-server.mjs");
await build({
  absWorkingDir: root,
  entryPoints: ["js/app.jsx"],
  outfile: server,
  bundle: true,
  format: "esm",
  platform: "node",
  packages: "external",
  define: { "process.env.NODE_ENV": '"production"' },
  plugins: [plugin],
});
const { default: App } = await import(pathToFileURL(server));
const production = await readFile(resolve(root, "dist/index.html"), "utf8");
const html = production.replace(
  /<div id="root">[\s\S]*<\/div>\s*<\/body>/,
  `<div id="root">${renderToString(React.createElement(App))}</div></body>`,
);
const browser = await chromium.launch({
  executablePath:
    process.env.BROWSER_PATH ||
    "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
  headless: true,
});
const page = await browser.newPage();
const errors = [],
  payloads = [];
let responseCode = 503,
  analyticsRequests = 0;
page.on("pageerror", (error) => errors.push(error.message));
await page.route("http://127.0.0.1:4173/", (route) =>
  route.fulfill({ body: html, contentType: "text/html" }),
);
await page.route("**/assets/app.js*", (route) =>
  route.fulfill({
    body: client.outputFiles[0].text,
    contentType: "text/javascript",
  }),
);
await page.route("https://analytics.invalid/script.js", (route) => {
  analyticsRequests++;
  return route.fulfill({ body: "", contentType: "text/javascript" });
});
await page.route("https://inquiry.invalid/submit", (route) => {
  payloads.push(route.request().postDataJSON());
  return route.fulfill({ status: responseCode, body: "{}" });
});
async function fill() {
  await page.locator("#field-name").fill("  Test Administrator  ");
  await page.locator("#field-email").fill("office@example.org");
  await page.locator("#field-organization").fill("Test organization");
  await page.locator("#field-need").fill("Test-only workflow inquiry");
  await page.locator("#field-budget").selectOption({ index: 1 });
  await page.locator("#field-timeline").selectOption({ index: 1 });
}
try {
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  assert.equal(analyticsRequests, 1);
  assert.equal(
    await page.locator(".hero-actions .button").first().getAttribute("href"),
    "https://calendar.invalid/book",
  );
  assert.equal(
    await page.locator(".contact-copy .button").getAttribute("href"),
    "https://calendar.invalid/book",
  );
  await fill();
  await page.locator(".contact-form button[type=submit]").click();
  await page
    .locator(".form-alert")
    .filter({ hasText: "could not be sent" })
    .waitFor();
  assert.equal(
    await page.locator("#field-name").inputValue(),
    "  Test Administrator  ",
  );
  assert.equal(payloads.length, 1);
  assert.equal(payloads[0].name, "Test Administrator");
  assert.equal(Object.keys(payloads[0]).length, 6);
  responseCode = 200;
  await page.locator(".contact-form button[type=submit]").click();
  await page.locator(".form-success").waitFor();
  assert.equal(
    await page.locator(".form-success h3").textContent(),
    "Your inquiry is on its way.",
  );
  assert.equal(payloads.length, 2);
  await page.locator(".form-success button").click();
  await page.locator("#website").evaluate((el) => {
    el.value = "spam";
  });
  await page.locator(".contact-form button[type=submit]").click();
  await page.locator(".form-success").waitFor();
  assert.equal(payloads.length, 2, "Honeypot must prevent network submission");
  assert.equal(errors.length, 0, errors.join("\n"));
  await writeFile(
    resolve(root, "artifacts/integration-check.json"),
    JSON.stringify(
      {
        calendar: "passed",
        analyticsOptIn: "passed",
        backendSuccess: "passed",
        backendFailureRetry: "passed",
        honeypot: "passed",
        consoleErrors: 0,
      },
      null,
      2,
    ),
  );
  console.log(
    "Configured calendar, opt-in analytics, mocked backend success/failure, and honeypot checks passed. No inquiries were sent.",
  );
} finally {
  await browser.close();
}
