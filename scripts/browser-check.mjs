import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "playwright-core";
import { content, isPlaceholder, isWebUrl } from "../js/content.js";
const root = resolve(import.meta.dirname, "..");
const browserPath =
  process.env.BROWSER_PATH ||
  "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe";
const output = resolve(root, "artifacts");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: browserPath,
  headless: true,
  args: ["--disable-extensions", "--no-first-run"],
});
const findings = [];
const previewUrl = process.env.SITE_PREVIEW_URL || "http://127.0.0.1:4173/";
try {
  for (const width of [375, 768, 1280]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const errors = [],
      failed = [];
    // Keep future runs safe after real integrations are configured.
    if (isWebUrl(content.settings.formEndpoint)) {
      await page.route(content.settings.formEndpoint, (route) =>
        route.fulfill({ status: 200, body: "{}" }),
      );
    }
    if (
      content.settings.analytics.enabled &&
      isWebUrl(content.settings.analytics.scriptUrl)
    ) {
      await page.route(content.settings.analytics.scriptUrl, (route) =>
        route.fulfill({ contentType: "text/javascript", body: "" }),
      );
    }
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("response", (response) => {
      if (response.status() >= 400)
        failed.push(`${response.status()} ${response.url()}`);
    });
    await page.goto(previewUrl, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator("h1").textContent(), content.hero.title);
    assert(!/\[ADD[^\]]*\]/i.test(await page.locator("body").innerText()));
    const brokenAnchors = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .filter(
            (link) =>
              !document.getElementById(link.getAttribute("href").slice(1)),
          )
          .map((link) => link.getAttribute("href")),
      );
    assert.deepEqual(
      brokenAnchors,
      [],
      "Section buttons must link to an existing target",
    );
    assert.equal(
      await page
        .locator('.footer-main a[href^="mailto:"]')
        .getAttribute("href"),
      `mailto:${content.identity.domainEmail || content.identity.email}`,
    );
    const cards = page.locator(".price-card");
    assert.equal(await cards.count(), 3);
    for (let i = 0; i < content.pricing.items.length; i++) {
      const tier = content.pricing.items[i];
      const card = cards.nth(i);
      assert.equal(await card.locator("h3").textContent(), tier.title);
      assert.equal(
        (await card.locator(".price").innerText()).replace(/\s+/g, " ").trim(),
        `${content.pricing.priceLabel} ${tier.price}`,
      );
      assert.equal(await card.locator("a").getAttribute("href"), "#contact");
      assert.equal(await card.locator("a").innerText(), content.pricing.cta);
      if (tier.timeline)
        assert((await card.innerText()).includes(tier.timeline));
      for (const feature of tier.includes)
        assert((await card.innerText()).includes(feature));
    }
    assert.equal(
      await page.locator(".pricing-addons dl > div").count(),
      content.pricing.addons.items.length,
    );
    const cardSizes = await cards.evaluateAll((elements) =>
      elements.map((el) => ({
        height: el.getBoundingClientRect().height,
        priceTop: el.querySelector(".price").getBoundingClientRect().top,
        buttonBottom: el.querySelector(".button").getBoundingClientRect()
          .bottom,
      })),
    );
    if (width >= 1024) {
      for (const key of ["height", "priceTop", "buttonBottom"])
        assert(
          Math.max(...cardSizes.map((card) => card[key])) -
            Math.min(...cardSizes.map((card) => card[key])) <
            1,
          `Desktop pricing ${key} must align`,
        );
    }
    await page
      .locator("#pricing")
      .screenshot({ path: resolve(output, `pricing-${width}.png`) });
    if (width === 375)
      await cards
        .last()
        .screenshot({ path: resolve(output, "custom-price-mobile.png") });
    await cards.first().locator("a").click();
    assert.equal(new URL(page.url()).hash, "#contact");
    await page.goto(previewUrl, { waitUntil: "networkidle" });
    assert.equal(await page.locator("canvas").count(), 0);
    assert.equal(
      await page.locator(".client-stats").count(),
      content.stats.some((stat) => !isPlaceholder(stat.value)) ? 1 : 0,
    );
    assert.equal(
      await page.locator("#testimonials-title").count(),
      content.testimonials.items.some(
        (item) =>
          item.quote &&
          item.name &&
          !isPlaceholder(item.quote) &&
          !isPlaceholder(item.name),
      )
        ? 1
        : 0,
    );
    const sizing = await page.evaluate(() => ({
      body: document.documentElement.scrollWidth,
      viewport: innerWidth,
      h1: document.querySelector("h1").getBoundingClientRect().height,
      ctaBottom: document
        .querySelector(".hero-actions .button")
        .getBoundingClientRect().bottom,
      scroll: getComputedStyle(document.documentElement).scrollBehavior,
    }));
    assert(
      sizing.body <= width,
      `Horizontal overflow at ${width}: ${sizing.body}`,
    );
    assert.equal(sizing.scroll, "auto");
    assert(
      sizing.ctaBottom < 900,
      `Primary CTA is below the first screen at ${width}`,
    );
    await page.keyboard.press("Tab");
    assert.equal(
      await page
        .locator(".skip-link")
        .evaluate((el) => document.activeElement === el),
      true,
    );
    if (width < 1024) {
      const toggle = page.locator("#menu-button");
      await toggle.click();
      assert.equal(await toggle.getAttribute("aria-expanded"), "true");
      await page.locator("#main-navigation a").first().focus();
      await page.keyboard.press("Escape");
      assert.equal(await toggle.getAttribute("aria-expanded"), "false");
    }
    const summary = page.locator(".faq-item summary").first();
    await summary.focus();
    await page.keyboard.press("Enter");
    assert.equal(await summary.getAttribute("aria-expanded"), "true");
    assert.equal(
      await page.locator(".faq-item").first().getAttribute("open"),
      "",
    );
    await page.keyboard.press("Space");
    assert.equal(await summary.getAttribute("aria-expanded"), "false");
    await page.locator(".contact-form button[type=submit]").click();
    assert.equal(await page.locator("[aria-invalid=true]").count(), 6);
    assert.equal(
      await page
        .locator("#field-name")
        .evaluate((el) => document.activeElement === el),
      true,
    );
    await page.locator("#field-name").fill("School Administrator");
    await page.locator("#field-email").fill("invalid");
    await page.locator("#field-organization").fill("School office");
    await page.locator("#field-need").fill("An attendance system for staff.");
    await page
      .locator("#field-budget")
      .selectOption(
        content.contact.fields.find((field) => field.name === "budget")
          .options[0],
      );
    await page
      .locator("#field-timeline")
      .selectOption(
        content.contact.fields.find((field) => field.name === "timeline")
          .options[0],
      );
    await page.locator(".contact-form button[type=submit]").click();
    assert.equal(await page.locator("[aria-invalid=true]").count(), 1);
    await page.locator("#field-email").fill("office@example.org");
    // Do not invoke the operating system email client during automated verification.
    await page.route("mailto:**", (route) => route.abort());
    await page.locator(".contact-form button[type=submit]").click();
    await page.locator(".form-success").waitFor();
    assert.equal(
      await page.locator(".form-success h3").textContent(),
      isWebUrl(content.settings.formEndpoint)
        ? content.contact.sentTitle
        : content.contact.preparedTitle,
    );
    if (!isWebUrl(content.settings.formEndpoint)) {
      const mail = await page
        .locator(".form-success .text-link")
        .first()
        .getAttribute("href");
      assert(mail.startsWith(`mailto:${content.identity.email}?`));
      assert(decodeURIComponent(mail).includes("School office"));
    }
    assert.equal(
      await page
        .locator(".form-success")
        .evaluate((el) => document.activeElement === el),
      true,
    );
    await page.locator(".form-success button").click();
    await page.locator("#website").evaluate((el) => {
      el.value = "spam";
    });
    await page.locator(".contact-form button[type=submit]").click();
    await page.locator(".form-success").waitFor();
    assert.equal(
      await page.locator(".form-success h3").textContent(),
      content.contact.sentTitle,
    );
    await page.reload({ waitUntil: "networkidle" });
    for (const image of await page.locator(".case-image img").all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((el) => el.decode());
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: resolve(output, `page-${width}.png`),
      fullPage: true,
    });
    await page.screenshot({ path: resolve(output, `hero-${width}.png`) });
    assert.equal(errors.length, 0, errors.join("\n"));
    assert.equal(failed.length, 0, failed.join("\n"));
    findings.push({
      width,
      ...sizing,
      consoleErrors: errors.length,
      failedRequests: failed.length,
    });
    await page.close();
  }
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.goto(previewUrl);
  assert.equal(await page.locator("h1").textContent(), content.hero.title);
  assert.equal(await page.locator(".contact-form").isVisible(), false);
  assert.equal(await page.locator(".no-js-contact").isVisible(), true);
  await page.locator(".faq-item summary").first().click();
  assert.equal(
    await page.locator(".faq-item").first().getAttribute("open"),
    "",
  );
  await page.close();
  await writeFile(
    resolve(output, "browser-check.json"),
    JSON.stringify(findings, null, 2),
  );
  console.log(JSON.stringify(findings, null, 2));
  console.log(
    "Responsive layout, keyboard navigation, accordion, validation, email handoff, honeypot, reduced motion, and no-JS content checks passed.",
  );
} finally {
  await browser.close();
}
