import { test, expect } from '@playwright/test';

test('Basic Web Test - Verify Page Title', async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/tables/dropdowns');

    // open the dropdown
    await page.getByTestId("lang-trigger").click();
    await page.getByRole('option', { name: 'JavaScript' }).click();
    //   await page.getByText("JavaScript").click();


    await page.getByTestId('experience-trigger').click();
    await page.getByText("Mid-level (4-6 years)", { exact: true }).click();




    await page.pause();





});