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
} finally {
  await browser.close();
}
