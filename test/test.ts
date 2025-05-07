import { chromium, ChromiumBrowser, Page } from "playwright";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

let browser: ChromiumBrowser;
let page: Page;

beforeAll(async () => {
    browser = await chromium.launch({headless: false});
    page = await browser.newPage();

    await page.goto('https://www.apple.com/mac/.');
}, 30000);


describe('checking navigation and elements', async () => {
    const expectedItems: string[] = [
        'MacBook Air', 'MacBook Pro', 'iMac', 'Mac mini',
        'Mac Studio', 'Mac Pro', 'Help Me Choose\na Mac', 'Compare\nMac models',
        'Displays', 'Accessories\nfor Mac', 'Sequoia', 'Shop Ma'
    ];
    const itemSelector: string = '#chapternav .chapternav-label';

    it('should be main navigation', async () => {
        await page.waitForSelector('nav#chapternav');

        const navbar: string | null = await page.locator('nav#chapternav').getAttribute('id');

        expect(navbar).toBe('chapternav');
    });
    
    expectedItems.forEach((item: string) => {

        it(`should be "${item}`, async () => {
            try {
                const items: string[] = await page
                                                .locator(itemSelector)
                                                .allInnerTexts();
                
                expect(items).contain(item);
            } catch(e) {
                console.error('An error occured. Taking screenshot...');
                
                await page.screenshot({ path: `./screenshots/${item}_failed_test.png`});

                throw e;
            }
        });

    });
});

afterAll(async () => {
    browser.close();
});