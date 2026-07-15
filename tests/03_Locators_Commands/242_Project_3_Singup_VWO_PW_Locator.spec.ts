import { test, expect } from '@playwright/test';


test('Verify the signup page has an error with the incorrect email ID. ', async ({ page }) => {
    await page.goto("https://vwo.com/free-trial/");
    await page.getByRole('textbox', { name: "email" }).fill("abcd");

    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: "Create a Free Trial Account" }).click();

    let error_msg = await page.locator("xpath=//div[contains(@class,'invalid-reason')]").first().textContent();

    // let error_msg_pw = await page.getByText('The email address you entered is incorrect.').textContent();

    expect(error_msg).toContain("The email address you entered is incorrect.");
    await page.waitForTimeout(10000);

});