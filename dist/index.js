// src/index.ts
var import_playwright = require("playwright");
(async () => {
  const browser = await import_playwright.chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://apple.com");
  await page.waitForSelector("nav#globalnav");
  const labels = await page.locator(".globalnav-link-text").allInnerTexts();
  browser.close();
  console.log(labels);
})();
