import { defineConfig, devices } from "playwright/test";

export default defineConfig({
    testDir: './test',
    testMatch: '**/*.ts',
    workers: 4,
    projects: [
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                headless: true
            }
        },
        {
            name: 'chrome',
            use: {
                ...devices['Desktop Chrome'],
                headless: true
            }
        }
    ],
    reporter: [['html', { open: 'never' }]]
});