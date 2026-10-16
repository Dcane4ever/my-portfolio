<<<<<<< HEAD
import { chromium } from "playwright-core";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath:
    "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
  headless: true,
});
const findings = [];
const previewUrl = process.env.SITE_PREVIEW_URL || "http://127.0.0.1:4173/";
try {
  for (const width of [375, 768, 1280]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "no-preference",
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(previewUrl, { waitUntil: "domcontentloaded" });
    const entrance = await page
      .locator("h1")
      .evaluate((el) => ({
        animation: getComputedStyle(el).animationName,
        running: el.getAnimations().some((a) => a.playState === "running"),
      }));
    assert.equal(entrance.animation, "landing-reveal");
    assert(
      entrance.running,
      "Landing headline must visibly animate during page load",
    );
    await page.waitForFunction(
      () => getComputedStyle(document.querySelector("h1")).opacity === "1",
    );
    const sections = page.locator("main > section:not(.hero), footer");
    const revealed = [];
    for (let i = 0; i < (await sections.count()); i++) {
      const section = sections.nth(i);
      const target = section
        .locator(
          ".section-heading, .contact-copy, .footer-main > div, .container > h2",
        )
        .first();
      await target.scrollIntoViewIfNeeded();
      await page.waitForFunction(
        (el) => el.style.opacity === "" && el.style.transform === "",
        await target.elementHandle(),
        { timeout: 3000 },
      );
      const hiddenBefore = await section
        .locator(
          ".service-card,.case-study,.price-card,.process-grid > li,.about-paragraph,.faq-item",
        )
        .evaluateAll(
          (elements) => elements.filter((el) => el.style.opacity).length,
        );
      await section.evaluate((el) =>
        window.scrollTo({
          top: el.getBoundingClientRect().bottom + scrollY - innerHeight + 50,
          behavior: "instant",
        }),
      );
      await page.waitForTimeout(1150);
      assert(
        await section
          .locator(
            ".service-card,.case-study,.price-card,.process-grid > li,.about-paragraph,.faq-item",
          )
          .evaluateAll((elements) => elements.every((el) => !el.style.opacity)),
        "Section content should be revealed after scrolling through it",
      );
      revealed.push({
        section:
          (await section.getAttribute("id")) ||
          (await section.getAttribute("class")),
        animatedContentInitiallyPending: hiddenBefore,
      });
    }
    await page.locator(".faq-item summary").first().click();
    await page.locator(".contact-form input").first().focus();
    assert.equal(
      await page.locator(".contact-form").evaluate((el) => el.style.opacity),
      "",
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForFunction(() =>
      [
        ...document.querySelectorAll(
          "main .section-heading, .service-card, .case-study, .price-card",
        ),
      ].every((el) => !el.style.opacity && !el.style.transform),
    );
    assert.equal(
      await page
        .locator("h1")
        .evaluate((el) => getComputedStyle(el).animationName),
      "none",
    );
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth),
      width,
    );
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(
      await page
        .locator("h1")
        .evaluate((el) => getComputedStyle(el).animationName),
      "none",
    );
    assert.equal(errors.length, 0, errors.join("\n"));
    findings.push({
      width,
      pageLoadEntrance: entrance,
      sections: revealed,
      reducedMotion: true,
      focusRevealsImmediately: true,
      consoleErrors: 0,
    });
    await page.close();
  }
  await writeFile(
    "artifacts/page-motion-check.json",
    JSON.stringify(findings, null, 2),
  );
  console.log(JSON.stringify(findings, null, 2));
=======
import assert from "node:assert/strict";
import { build } from "esbuild";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "playwright-core";
import { content, isWebUrl } from "../js/content.js";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "artifacts");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.BROWSER_PATH ||
    "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
  headless: true,
});
const previewUrl = process.env.SITE_PREVIEW_URL || "http://127.0.0.1:4173/";
const findings = [];
const errors = [];

async function createPage(width) {
  const page = await browser.newPage({
    viewport: { width, height: 900 }, reducedMotion: "no-preference",
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  if (isWebUrl(content.settings.formEndpoint)) {
    await page.route(content.settings.formEndpoint, (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: '{"next":"https://formspree.io/thanks"}' }));
  }
  if (content.settings.analytics.enabled && isWebUrl(content.settings.analytics.scriptUrl)) {
    await page.route(content.settings.analytics.scriptUrl, (route) =>
      route.fulfill({ contentType: "text/javascript", body: "" }));
  }
  return page;
}

try {
  for (const width of [375, 768, 1280]) {
    const page = await createPage(width);
    await page.goto(previewUrl, { waitUntil: "networkidle" });
    await page.locator(".workspace-replay:not(:disabled)").waitFor();
    // Sample the entrance while it runs, instead of only checking static output.
    const card = page.locator(".service-card").first();
    await card.evaluate((element) => {
      window.__revealSamples = [];
      window.__staggerSamples = [];
      window.__revealObserver = new MutationObserver(() => {
        window.__revealSamples.push(Number(getComputedStyle(element).opacity));
        window.__staggerSamples.push(Array.from(document.querySelectorAll(".service-card"))
          .map((card) => Number(getComputedStyle(card).opacity)));
      });
      window.__revealObserver.observe(element, { attributes: true, attributeFilter: ["style"] });
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 260, behavior: "instant" });
    });
    await page.waitForFunction(() => window.__revealSamples.some((opacity) => opacity < 0.95));
    await page.waitForFunction(() => {
      const element = document.querySelector(".service-card");
      return getComputedStyle(element).opacity === "1" && !element.style.transform;
    });
    await page.evaluate(() => window.__revealObserver.disconnect());
    assert(await card.isVisible());
    if (width === 1280) {
      assert(await page.evaluate(() => window.__staggerSamples.some(
        ([first, second, third]) => first > second + 0.05 && second > third + 0.05,
      )), "Desktop cards should reveal in sequence within their row");
    }

    for (const selector of [".case-study", ".process-grid > li", ".price-card", ".about-photo", ".contact-form"]) {
      const element = page.locator(selector).first();
      await element.evaluate((node) => {
        window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY - 220, behavior: "instant" });
      });
      await page.waitForTimeout(900);
      assert.equal(await element.evaluate((node) => getComputedStyle(node).opacity), "1");
      assert.equal(await element.evaluate((node) => node.style.transform), "");
    }

    if (width === 1280) {
      const project = page.locator(".case-study").first();
      await project.scrollIntoViewIfNeeded();
      await project.hover();
      await page.waitForTimeout(650);
      assert.equal(await project.evaluate((node) => getComputedStyle(node).translate), "0px -4px");
      assert.notEqual(await project.locator("img").evaluate((node) => getComputedStyle(node).transform), "none");
      await page.mouse.move(0, 0);
    }

    const summary = page.locator(".faq-item summary").first();
    await summary.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(450);
    assert.equal(await summary.getAttribute("aria-expanded"), "true");
    assert(await page.locator("#faq-answer-0").isVisible());
    await page.keyboard.press("Space");
    await page.waitForTimeout(450);
    assert.equal(await summary.getAttribute("aria-expanded"), "false");

    const table = page.locator(".preview-table");
    await table.scrollIntoViewIfNeeded();
    const row = table.locator("tbody tr").first();
    await page.waitForFunction(() => Array.from(document.querySelectorAll(".preview-table tbody tr"))
      .every((element) => !element.style.backgroundColor));
    await page.locator(".workspace-replay").click();
    await page.waitForFunction(() => !!document.querySelector(".preview-table tbody tr").style.backgroundColor);
    await page.waitForFunction(() => Array.from(document.querySelectorAll(".preview-table tbody tr"))
      .every((element) => !element.style.backgroundColor));
    // A second replay must animate from the same baseline, with no stale styles.
    await page.locator(".workspace-replay").click();
    await page.waitForFunction(() => !!document.querySelector(".preview-table tbody tr").style.backgroundColor);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForFunction(() => document.querySelector(".workspace-replay").disabled);
    assert.equal(await row.evaluate((node) => node.style.backgroundColor), "");
    assert.equal(await row.locator("svg path").evaluate((node) => node.style.strokeDashoffset), "");
    const residualStyles = await page.locator("main [style]").evaluateAll((nodes) => nodes.filter(
      (node) => node.style.transform || node.style.opacity || node.style.strokeDashoffset,
    ).length);
    assert.equal(residualStyles, 0, "Reduced motion must restore all animated content immediately");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.locator(".workspace-replay:not(:disabled)").waitFor();
    await table.scrollIntoViewIfNeeded();
    await page.waitForTimeout(3500);
    await page.screenshot({ path: resolve(output, `motion-preview-${width}.png`) });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    findings.push({ width, reveals: "passed", workflowReplay: "passed", liveReducedMotion: "passed" });
    await page.close();
  }

  // Strict Mode remounting must leave one set of triggers; unmount must leave none.
  const fixture = await build({
    absWorkingDir: root,
    stdin: {
      contents: `import React from "react";
        import { hydrateRoot } from "react-dom/client";
        import App from "./js/app.jsx";
        import { ScrollTrigger } from "./js/motion.js";
        const root = hydrateRoot(document.getElementById("root"), <React.StrictMode><App /></React.StrictMode>);
        window.__motionTest = { count: () => ScrollTrigger.getAll().length, unmount: () => root.unmount() };`,
      resolveDir: root, loader: "jsx",
    },
    bundle: true, write: false,
    define: { "process.env.NODE_ENV": '"development"' },
  });
  const page = await createPage(1280);
  await page.route("**/assets/app.js", (route) => route.fulfill({
    body: fixture.outputFiles[0].text, contentType: "text/javascript",
  }));
  await page.goto(previewUrl, { waitUntil: "networkidle" });
  const triggerCount = await page.evaluate(() => window.__motionTest.count());
  assert(triggerCount > 0 && triggerCount < 45, `Unexpected trigger count: ${triggerCount}`);
  await page.evaluate(() => window.__motionTest.unmount());
  assert.equal(await page.evaluate(() => window.__motionTest.count()), 0);
  await page.close();

  const deepLink = await createPage(1280);
  await deepLink.goto(`${previewUrl}#pricing`, { waitUntil: "networkidle" });
  await deepLink.waitForTimeout(1100);
  assert.equal(await deepLink.locator(".price-card").first().evaluate((node) => getComputedStyle(node).opacity), "1");
  assert.equal(await deepLink.locator("h1").evaluate((node) => node.style.transform), "");
  await deepLink.close();

  assert.deepEqual(errors, [], "Motion must not cause browser or hydration errors");
  await writeFile(resolve(output, "motion-check.json"), JSON.stringify({
    findings, strictModeCleanup: "passed", deepLinks: "passed", consoleErrors: errors.length,
  }, null, 2));
  console.log("Motion checks passed: responsive reveals, repeated replay, hover, live reduced motion, deep links, and Strict Mode cleanup.");
>>>>>>> 003dd30003db58dd6fb5db84c427b0b71b48538f
} finally {
  await browser.close();
}
