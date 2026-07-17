import { test, expect } from '@playwright/test';


test('Basic verify how to handle multiple elements ', async ({ page }) => {

    // Navigate to the page.
    // Find the locator which gives all the elements and text
    // loop through it and find the one which we want to click

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");
    // getByRole, getByText() - not unique
    await page.pause();
    await page.getByTestId('forgotten-password-link').click();









});