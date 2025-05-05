import { chromium, ChromiumBrowser, Page } from "playwright";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

let browser: ChromiumBrowser;
let page: Page;

beforeAll(async () => {
    browser = await chromium.launch({headless: true});
    page = await browser.newPage();

    await page.goto('https://apple.com');
}, 20000);


describe('checking navigation and elements', async () => {
    it('should be main navigation', async () => {
        await page.waitForSelector('nav#globalnav');

        const navbar: string | null = await page.locator('nav#globalnav').getAttribute('id');

        expect(navbar).toBe('globalnav');
    });
    
    it('should be elements in navigation', async () => {
        const expectedItems: string[] = [
            'Apple', 'Store', 'Mac', 'iPad', 'iPhone',
            'Watch', 'Vision', 'AirPods', 'TV & Home',
            'Entertainment', 'Accessories', 'Support'
        ];
        const navItems: string [] = await page.locator('.globalnav-link-text').allInnerTexts();
        console.log(navItems);

        expect(navItems).toEqual(expectedItems);
    });
});

afterAll(async () => {
    browser.close();
});