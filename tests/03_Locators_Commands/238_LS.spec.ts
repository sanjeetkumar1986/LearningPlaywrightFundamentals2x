import { test, expect } from '@playwright/test';


test('Verify our first TC', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/ttacart/",

    );
});