// src/index.ts
var import_playwright = require("playwright");
(async () => {
  const browser = await import_playwright.chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://google.com");
  const linkText = await page.locator(".m5Qfy").innerText();
  browser.close();
  console.log(linkText);
})();
