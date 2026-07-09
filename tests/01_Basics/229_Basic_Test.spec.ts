import { test, expect } from '@playwright/test';

test("Verify the title", async ({ page }) => {
    await page.goto("https://app.vwo.com");
    await expect(page).toHaveTitle("Wingify - Application");
    // page = fixture (injected by Playwright)

});