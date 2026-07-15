import { test, expect } from '@playwright/test';

test("goto with different waitUntil options", async ({ page }) => {

    await page.goto("https://app.com/page1", { waitUntil: "commit" });
    console.log("commit: server responded");

    // Wait for HTML to be parsed
    await page.goto("https://app.com/page2", { waitUntil: "domcontentloaded" });
    console.log("domcontentloaded: HTML parsed");

    // DEFAULT — wait for everything (images, CSS, scripts)
    await page.goto("https://app.com/page3", { waitUntil: "load" });
    console.log("load: all resources loaded");

    // SLOWEST — wait for all network activity to stop
    await page.goto("https://app.com/page4", { waitUntil: "networkidle" });
    console.log("networkidle: no requests for 500ms");




});