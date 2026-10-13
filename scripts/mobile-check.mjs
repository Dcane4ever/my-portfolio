import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "playwright-core";
import { content, isWebUrl } from "../js/content.js";

const output = resolve(import.meta.dirname, "../artifacts");
await mkdir(output, { recursive: true });
const url = process.env.SITE_PREVIEW_URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({
  executablePath: process.env.BROWSER_PATH ||
    "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
  headless: true,
});
const findings = [];
const errors = [];

async function openPage(width, height, javaScriptEnabled = true) {
  const page = await browser.newPage({
    viewport: { width, height }, isMobile: true, hasTouch: true,
    reducedMotion: "reduce", javaScriptEnabled,
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  let submissions = 0;
  await page.route("https://formspree.io/f/**", (route) => {
    submissions++;
    return route.fulfill({ contentType: "application/json", body: '{"next":"https://formspree.io/thanks"}' });
  });
  if (content.settings.analytics.enabled && isWebUrl(content.settings.analytics.scriptUrl)) {
    await page.route(content.settings.analytics.scriptUrl, (route) =>
      route.fulfill({ contentType: "text/javascript", body: "" }));
  }
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  return { page, submissions: () => submissions };
}

try {
  for (const [width, height] of [[320, 568], [360, 740], [390, 844], [430, 932], [600, 800], [768, 1024], [844, 390], [844, 240]]) {
    const { page, submissions } = await openPage(width, height);
    const layout = await page.evaluate(() => ({
      width: innerWidth, overflow: document.documentElement.scrollWidth > innerWidth,
      ctaBottom: document.querySelector(".hero-actions .button").getBoundingClientRect().bottom,
      fields: Array.from(document.querySelectorAll(".form-field input, .form-field select, .form-field textarea"))
        .map((element) => ({
          name: element.name,
          font: parseFloat(getComputedStyle(element).fontSize),
          height: element.getBoundingClientRect().height,
          right: element.getBoundingClientRect().right,
        })),
    }));
    assert.equal(layout.width, width, "The viewport must use device width");
    assert.equal(layout.overflow, false, `Horizontal overflow at ${width}×${height}`);
    if (width < 600) assert(layout.ctaBottom < height, "The first call button should fit the phone's first screen");
    for (const field of layout.fields) {
      assert(field.font >= 16, `${field.name} text must stay readable without iOS input zoom`);
      assert(field.height >= 44 && field.right <= width, `${field.name} must fit with a usable touch target`);
    }
    const toggle = page.locator("#menu-button");
    await toggle.tap();
    assert.equal(await toggle.getAttribute("aria-expanded"), "true");
    const menuBounds = await page.locator("#main-navigation").boundingBox();
    assert(menuBounds.y + menuBounds.height <= height, "Navigation must fit even in short landscape views");
    await page.touchscreen.tap(width - 6, Math.min(menuBounds.y + menuBounds.height + 10, height - 2));
    await page.waitForFunction(() => document.querySelector("#menu-button").getAttribute("aria-expanded") === "false");
    await toggle.tap();
    await page.locator('#main-navigation a[href="#work"]').tap();
    assert.equal(new URL(page.url()).hash, "#work");
    assert.equal(await toggle.getAttribute("aria-expanded"), "false");
    const workTop = await page.locator("#work").evaluate((element) => element.getBoundingClientRect().top);
    const headerBottom = await page.locator(".site-header").evaluate((element) => element.getBoundingClientRect().bottom);
    assert(workTop >= headerBottom - 1, "Anchor destinations must clear the sticky header");
    await toggle.tap();
    await page.keyboard.press("Escape");
    assert.equal(await toggle.getAttribute("aria-expanded"), "false");
    assert.equal(await toggle.evaluate((element) => document.activeElement === element), true);
    await toggle.tap();
    await page.locator(".nav > .button").tap();
    assert.equal(await toggle.getAttribute("aria-expanded"), "false");
    await toggle.tap();
    await page.locator(".nav > .brand").tap();
    assert.equal(await toggle.getAttribute("aria-expanded"), "false");
    const inquiryHash = new URL(page.url()).hash;

    // Entering an inquiry, then reducing the viewport, must preserve the draft.
    await page.locator("#field-name").fill("Mobile Visitor");
    await page.locator("#field-email").fill("mobile@example.org");
    await page.locator("#field-organization").fill("Mobile business");
    await page.locator("#field-need").fill("A booking system for our team.");
    await page.locator("#field-budget").selectOption({ index: 1 });
    await page.locator("#field-timeline").selectOption({ index: 1 });
    await page.setViewportSize({ width, height: Math.max(320, height - 280) });
    await page.locator("#field-need").evaluate((element) => { element.focus(); element.scrollIntoView({ block: "center" }); });
    assert.equal(await page.locator("#field-need").inputValue(), "A booking system for our team.");
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.setViewportSize({ width, height });
    await page.locator(".contact-form button[type=submit]").tap();
    await page.locator(".form-success").waitFor();
    assert.equal(submissions(), 1);
    assert.equal(await page.locator(".form-success p").textContent(), content.contact.sentMessage);
    assert.equal(new URL(page.url()).hash, inquiryHash, "Submitting must not navigate the page");
    await page.locator(".form-success button").tap();
    assert.equal(await page.locator("#field-name").inputValue(), "");
    if (width === 390) {
      await page.locator("#contact").screenshot({ path: resolve(output, "mobile-contact-390.png") });
      await page.locator("#work").screenshot({ path: resolve(output, "mobile-projects-390.png") });
      await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
      await page.screenshot({ path: resolve(output, "mobile-hero-390.png") });
    }
    findings.push({ width, height, overflow: false, touchNavigation: "passed", formSubmission: "mocked and passed" });
    await page.close();
  }

  const { page } = await openPage(390, 844);
  await page.locator("#menu-button").tap();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.waitForFunction(() => document.querySelector("#menu-button").getAttribute("aria-expanded") === "false");
  assert.equal(await page.locator("#menu-button").isVisible(), false);
  assert.equal(await page.locator("#main-navigation").evaluate((element) => getComputedStyle(element).display), "flex");
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await page.locator("#main-navigation").isVisible(), false, "Rotating / resizing back must not reopen a stale menu");
  await page.close();

  const { page: staticPage } = await openPage(320, 568, false);
  assert.equal(await staticPage.locator("#main-navigation").isVisible(), true);
  assert.equal(await staticPage.locator(".no-js-contact").isVisible(), true);
  assert.equal(await staticPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await staticPage.close();
  assert.deepEqual(errors, []);
  await writeFile(resolve(output, "mobile-check.json"), JSON.stringify({ findings, resizeMenuReset: "passed", noJs: "passed", browserErrors: errors.length }, null, 2));
  console.log("Mobile checks passed: 320–844px touch views, portrait/landscape, navigation dismissal, sticky anchors, draft retention, mocked submissions, resize, and no-JS fallback.");
} finally {
  await browser.close();
}
