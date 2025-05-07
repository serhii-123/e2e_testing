import { test, expect } from '@playwright/test'

test.describe('should be navigation and its items', () => {
    const expectedItems: string[] = [
        'MacBook Air', 'MacBook Pro', 'iMac', 'Mac mini',
        'Mac Studio', 'Mac Pro', 'Help Me Choose\na Mac', 'Compare\nMac models',
        'Displays', 'Accessories\nfor Mac', 'Sequoia', 'Shop Mac'
    ];
    const itemSelector: string = '#chapternav .chapternav-label';

    test.beforeEach(async ({page}) => {
        await page.goto('https://www.apple.com/mac');
        await page.waitForLoadState('load');
    });

    test('should be navigation', async ({ page }) => {
        await page.waitForSelector('nav#chapternav');

        const navbar: string | null = await page.locator('nav#chapternav').getAttribute('id');

        expect(navbar).toBe('chapternav');
    });

    expectedItems.forEach((item: string) => {

        test(`should be "${item}`, async ({ page }) => {
            try {
                const items: string[] = await page
                                                .locator(itemSelector)
                                                .allInnerTexts();
                
                expect(items).toContain(item);
            } catch(e) {
                console.error('An error occured. Taking screenshot...');
                
                await page.screenshot({ path: `./screenshots/${item}_failed_test.png`});

                throw e;
            }
        });

    });
})