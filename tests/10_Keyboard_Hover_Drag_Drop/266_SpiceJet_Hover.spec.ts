import { test, expect, FrameLocator, Locator } from '@playwright/test';

test('Ignore this spelling Kumar!', async ({ page }) => {

    await page.goto('https://www.spicejet.com/');
    await page.getByText("Add-ons", { exact: true }).hover();
    await page.getByText('FlyEarly', { exact: true }).click();

    // https://app.thetestingacademy.com/playwright/widgets/hover-menu

});