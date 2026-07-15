import { test, expect } from '@playwright/test';

test("locators are lazy, strict, and auto-wait", async ({ page }) => {
    await page.goto("https://awesomeqa.com/practice.html");
    await page.locator('[name="firstname"]').pressSequentially("the testing academy", { delay: 200 });

    await page.waitForTimeout(5000);

    await page.goto("https://app.vwo.com/login");
    await page.goBack();
    await page.waitForTimeout(5000);


});