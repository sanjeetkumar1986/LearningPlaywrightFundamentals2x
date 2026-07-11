// https://app.vwo.com/#/login

import { test, expect } from "@playwright/test";
test("TC#1 - Verify that the app.vwo login is not working and gives you an error with lazy, strict, and auto wait concepts", async ({ page }) => {

    await page.goto("https://app.vwo.com/#login");

    // Defalt Locators
    //  id, name, className, Tag., Custom Locator (Via CSS selector)

    // Css Seclector ->  Browser - Css Engine, Help you to find the element
    // by using the default locators
    // id => #id
    // className => .
    // name => [name="value"]
    // Tag => [tag]

    // <input 
    // type="email" 
    // class="text-input W(100%)" 
    // name="username" 
    // vwo-html-translate-attr="placeholder" 
    // vwo-html-translate-placeholder="login:enterEmailID" 
    // id="login-username" 
    // data-qa="hocewoqisi" 
    // placeholder="Enter email ID" 
    // data-gtm-form-interact-field-id="0"
    // >

    let userNameField = page.locator('#login-username');

    let passwordField = page.locator("#login-password");
    let loginButton = page.locator("#js-login-btn");

    // NOW Playwright finds the element and acts (auto-wait)
    await userNameField.fill("admin@admin.com");
    await passwordField.fill("pass123");
    await loginButton.click();

    let error_message = page.locator('#js-notification-box-msg');
    await expect(error_message).toContainText("Your email, password, IP address or location did not match");









});