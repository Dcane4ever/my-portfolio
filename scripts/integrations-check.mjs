import assert from "node:assert/strict";
import { build } from "esbuild";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import React from "react";
import { renderToString } from "react-dom/server";
import { chromium } from "playwright-core";
import { content } from "../js/content.js";

const root = resolve(import.meta.dirname, "..");
const previewUrl = process.env.SITE_PREVIEW_URL || "http://127.0.0.1:4173/";
const endpoint = "https://formspree.io/f/test-inquiry";
const output = resolve(root, "artifacts");
await mkdir(output, { recursive: true });
const production = await readFile(resolve(root, "dist/index.html"), "utf8");

// These fixtures never change production config or send inquiries to Formspree.
async function fixture(settings, name) {
  const plugin = {
    name: "test-config",
    setup(builder) {
      builder.onLoad({ filter: /content\.js$/ }, async (args) => ({
        contents: `${await readFile(args.path, "utf8")}\nObject.assign(content.settings, ${JSON.stringify(settings)});`,
        loader: "js",
      }));
    },
  };
  const serverPath = resolve(root, `.build/${name}-server.mjs`);
  const [client] = await Promise.all([
    build({
      absWorkingDir: root, entryPoints: ["js/app-gh-pages.jsx"],
      bundle: true, write: false, minify: true,
      define: { "process.env.NODE_ENV": '"production"' }, plugins: [plugin],
    }),
    build({
      absWorkingDir: root, entryPoints: ["js/app.jsx"], outfile: serverPath,
      bundle: true, format: "esm", platform: "node", packages: "external",
      define: { "process.env.NODE_ENV": '"production"' }, plugins: [plugin],
    }),
  ]);
  const { default: App } = await import(pathToFileURL(serverPath));
  return {
    client: client.outputFiles[0].text,
    html: production.replace(
      /<div id="root">[\s\S]*<\/div>\s*<\/body>/,
      `<div id="root">${renderToString(React.createElement(App))}</div></body>`,
    ),
  };
}

const configured = await fixture({
  formEndpoint: endpoint,
  calendarUrl: "https://calendar.invalid/book",
  analytics: { enabled: true, domain: "site.invalid", scriptUrl: "https://analytics.invalid/script.js" },
}, "integration");
const placeholder = await fixture({
  formEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
  analytics: { enabled: false },
}, "placeholder");

const browser = await chromium.launch({
  executablePath: process.env.BROWSER_PATH ||
    "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
  headless: true,
});
const errors = [];
const payloads = [];
const page = await browser.newPage({ reducedMotion: "reduce" });
let mode = "server-error";
let release;
let analyticsRequests = 0;
let navigations = 0;
page.on("pageerror", (error) => errors.push(error.message));
page.on("framenavigated", (frame) => { if (frame === page.mainFrame()) navigations++; });
await page.route(previewUrl, (route) => route.fulfill({ body: configured.html, contentType: "text/html" }));
await page.route("**/assets/app.js", (route) => route.fulfill({ body: configured.client, contentType: "text/javascript" }));
await page.route("https://analytics.invalid/script.js", (route) => {
  analyticsRequests++;
  return route.fulfill({ body: "", contentType: "text/javascript" });
});
await page.route("https://formspree.io/f/**", async (route) => {
  const request = route.request();
  assert.equal(request.url(), endpoint);
  assert.equal(request.method(), "POST");
  assert.equal(request.headers().accept, "application/json");
  payloads.push(request.postDataJSON());
  if (mode === "network") return route.abort("failed");
  if (mode === "held-success") await new Promise((resolve) => { release = resolve; });
  if (mode === "timeout") {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return route.abort().catch(() => {});
  }
  const responses = {
    "server-error": { status: 503, body: '{"errors":[{"message":"Unavailable"}]}' },
    "rate-limit": { status: 429, body: '{"errors":[{"message":"Rate limited"}]}' },
    "field-error": { status: 422, body: '{"errors":[{"field":"message","message":"Invalid message"}]}' },
    "select-error": { status: 422, body: '{"errors":[{"field":"budget","message":"Invalid budget"}]}' },
    "html": { status: 200, body: "<html>Unexpected response</html>", contentType: "text/html" },
    "malformed": { status: 200, body: "{broken-json" },
    "unconfirmed": { status: 200, body: "{}" },
    "rejected": { status: 200, body: '{"ok":false}' },
    "contradictory": { status: 200, body: '{"next":"https://formspree.io/thanks","error":"Not accepted"}' },
    "redirect": { status: 302, headers: { location: "https://formspree.io/thanks" }, body: "" },
    "success": { status: 200, body: '{"ok":true,"next":"https://formspree.io/thanks"}' },
    "held-success": { status: 200, body: '{"next":"https://formspree.io/thanks"}' },
  };
  return route.fulfill({ contentType: "application/json", ...responses[mode] });
});

async function fill(target = page) {
  await target.locator("#field-name").fill("  Test Administrator  ");
  await target.locator("#field-email").fill("  office@example.org  ");
  await target.locator("#field-organization").fill("  Test organization  ");
  await target.locator("#field-need").fill("  Test-only workflow inquiry  ");
  await target.locator("#field-budget").selectOption({ index: 1 });
  await target.locator("#field-timeline").selectOption({ index: 1 });
}
async function expectFailure(message) {
  await page.locator(".contact-form button[type=submit]").click();
  await page.locator(".form-alert").filter({ hasText: message }).waitFor();
  assert.equal(await page.locator(".form-success").count(), 0);
  assert.equal(await page.locator("#field-name").inputValue(), "  Test Administrator  ");
  assert.equal(await page.locator("#field-need").inputValue(), "  Test-only workflow inquiry  ");
  assert.equal(await page.locator(".contact-form button[type=submit]").isEnabled(), true);
}

try {
  await page.goto(previewUrl, { waitUntil: "networkidle" });
  const loadedNavigations = navigations;
  assert.equal(analyticsRequests, 1);
  assert.equal(await page.locator(".hero-actions .button").first().getAttribute("href"), "https://calendar.invalid/book");
  assert.equal(await page.locator(".contact-copy .button").getAttribute("href"), "https://calendar.invalid/book");
  await fill();
  await expectFailure("could not be sent");
  assert.equal(payloads[0].name, "Test Administrator");
  assert.equal(payloads[0].email, "office@example.org");
  assert.equal(payloads[0].organization, "Test organization");
  assert.equal(payloads[0].message, "Test-only workflow inquiry");
  assert.equal(payloads[0].need, payloads[0].message);
  assert.equal(payloads[0]._gotcha, "");
  assert.equal(payloads[0]._subject, content.contact.subject);
  for (const field of content.contact.fields) assert(field.name in payloads[0]);

  mode = "field-error";
  await expectFailure("could not be sent");
  assert.equal(await page.locator("#field-need").getAttribute("aria-invalid"), "true");
  assert.equal(await page.locator("#field-need").evaluate((element) => document.activeElement === element), true);
  assert.equal(await page.locator("#field-need").getAttribute("aria-describedby"), "error-need");
  mode = "select-error";
  await expectFailure("could not be sent");
  assert.equal(await page.locator("#field-budget").evaluate((element) => document.activeElement === element), true);
  for (const scenario of ["network", "html", "malformed", "unconfirmed", "rejected", "contradictory", "redirect"]) {
    mode = scenario;
    await expectFailure("could not be sent");
  }
  mode = "rate-limit";
  await expectFailure("wait a few minutes");
  mode = "timeout";
  await page.evaluate(() => {
    window.__originalTimeout = window.setTimeout;
    window.setTimeout = (callback, delay, ...args) => window.__originalTimeout(callback, delay === 15000 ? 100 : delay, ...args);
  });
  await expectFailure("could not confirm");
  await page.evaluate(() => { window.setTimeout = window.__originalTimeout; });

  mode = "held-success";
  const before = payloads.length;
  // Two synchronous submits exercise the guard before React updates disabled state.
  await page.locator(".contact-form").evaluate((form) => { form.requestSubmit(); form.requestSubmit(); });
  await page.waitForFunction(() => document.querySelector(".contact-form button[type=submit]").disabled);
  await page.waitForTimeout(100);
  assert.equal(payloads.length, before + 1, "Only one in-flight request is allowed");
  assert.equal(await page.locator(".submission-spinner").count(), 1);
  assert.equal(await page.locator(".contact-form").getAttribute("aria-busy"), "true");
  assert.equal(await page.locator("#field-name").evaluate((element) => element.readOnly), true);
  assert.equal(await page.locator("#field-budget").isDisabled(), true);
  assert.equal(await page.locator(".form-success").count(), 0);
  release();
  await page.locator(".form-success").waitFor();
  assert.equal(await page.locator(".form-success p").textContent(), content.contact.sentMessage);
  assert.equal(await page.locator(".form-success").evaluate((element) => document.activeElement === element), true);
  assert.equal(await page.locator(".form-success").getAttribute("aria-live"), "polite");
  await page.locator(".form-success button").click();
  for (const field of content.contact.fields) assert.equal(await page.locator(`#field-${field.name}`).inputValue(), "");
  const beforeTrap = payloads.length;
  await page.locator("#website").evaluate((element) => { element.value = "spam"; });
  await page.locator(".contact-form button[type=submit]").click();
  await page.locator(".form-alert").filter({ hasText: "could not be sent" }).waitFor();
  assert.equal(payloads.length, beforeTrap, "Honeypot must stop the request");
  assert.equal(await page.locator(".form-success").count(), 0, "Blocked spam must not claim delivery");
  assert.equal(navigations, loadedNavigations, "Submission must not reload or navigate the page");

  const unconfigured = await browser.newPage();
  unconfigured.on("pageerror", (error) => errors.push(error.message));
  let unconfiguredRequests = 0;
  await unconfigured.route(previewUrl, (route) => route.fulfill({ body: placeholder.html, contentType: "text/html" }));
  await unconfigured.route("**/assets/app.js", (route) => route.fulfill({ body: placeholder.client, contentType: "text/javascript" }));
  await unconfigured.route("https://formspree.io/f/**", (route) => {
    unconfiguredRequests++;
    return route.abort();
  });
  await unconfigured.goto(previewUrl, { waitUntil: "networkidle" });
  await fill(unconfigured);
  await unconfigured.locator(".contact-form button[type=submit]").click();
  await unconfigured.locator(".form-alert").filter({ hasText: "temporarily unavailable" }).waitFor();
  assert.equal(unconfiguredRequests, 0, "YOUR_FORM_ID must never receive a live request");
  assert.equal(await unconfigured.locator(".form-success").count(), 0);
  await unconfigured.close();
  assert.deepEqual(errors, []);
  await writeFile(resolve(output, "integration-check.json"), JSON.stringify({
    calendar: "passed", analyticsOptIn: "passed", formspreeSuccess: "mocked and passed",
    httpErrors: "passed", networkErrors: "passed", unexpectedResponses: "passed",
    timeout: "passed", serverValidation: "passed", trimmedPayload: "passed",
    duplicatePrevention: "passed", honeypot: "passed", successReset: "passed",
    noReload: "passed", placeholderGuard: "passed", consoleErrors: errors.length,
  }, null, 2));
  console.log("Formspree integration checks passed: confirmed success, errors, timeout, validation, trimming, duplicates, honeypot, reset, and no reload. All submissions were mocked.");
} finally {
  release?.();
  await browser.close();
}
