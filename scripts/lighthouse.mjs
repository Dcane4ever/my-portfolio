import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const output = resolve(import.meta.dirname, "../artifacts");
await mkdir(output, { recursive: true });
const chrome = await launch({
  chromePath:
    process.env.BROWSER_PATH ||
    "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe",
  chromeFlags: ["--headless", "--disable-extensions", "--no-first-run"],
  logLevel: "silent",
});
try {
  const result = await lighthouse("http://127.0.0.1:4173/", {
    port: chrome.port,
    output: ["json", "html"],
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });
  await writeFile(resolve(output, "lighthouse-mobile.json"), result.report[0]);
  await writeFile(resolve(output, "lighthouse-mobile.html"), result.report[1]);
  const scores = Object.fromEntries(
    Object.entries(result.lhr.categories).map(([key, value]) => [
      key,
      Math.round(value.score * 100),
    ]),
  );
  console.log(
    JSON.stringify(
      {
        scores,
        metrics: {
          FCP: result.lhr.audits["first-contentful-paint"].displayValue,
          LCP: result.lhr.audits["largest-contentful-paint"].displayValue,
          CLS: result.lhr.audits["cumulative-layout-shift"].displayValue,
        },
        issues: Object.values(result.lhr.audits)
          .filter((audit) => audit.score !== null && audit.score < 1)
          .map((audit) => ({
            id: audit.id,
            title: audit.title,
            score: audit.score,
            details: audit.details,
          })),
      },
      null,
      2,
    ),
  );
  if (Object.values(scores).some((score) => score < 90)) process.exitCode = 1;
} finally {
  await chrome.kill();
}
