import { defineConfig, devices } from "playwright/test";

export default defineConfig({
    testDir: './test',
    testMatch: '**/*.ts',
    workers: 4,
    projects: [
        {
            name: 'firefox',
            use: {...devices['Desktop Firefox']}
        },
        {
            name: 'chrome',
            use: {...devices['Desktop Chrome']}
        }
    ],
    reporter: [['html', { open: 'never' }]]
});