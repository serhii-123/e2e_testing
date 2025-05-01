import { chromium } from "playwright";

(async () => {
    const browser = await chromium.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://google.com');

    await page.waitForSelector('nav#globalnav');

    const labels = await page.locator('.globalnav-link-text').allInnerTexts();

    browser.close();

    console.log(labels);
})();