import { chromium } from "playwright";
import dotenv from "dotenv";

// Credentials live in .env (gitignored) — never hardcode them in a public repo.
// Copy .env.example -> .env and fill in your own VWO login before running this.
dotenv.config();

const VWO_USER = process.env.VWO_USER;
const VWO_PASS = process.env.VWO_PASS;

async function saveAdminSession() {



}

async function saveSession() {

    if (!VWO_USER || !VWO_PASS) {
        throw new Error("Missing VWO_USER / VWO_PASS. Copy .env.example to .env and fill them in.");
    }

    let browser = await chromium.launch({ headless: false });
    let context = await browser.newContext();
    let page = await context.newPage();

    await page.goto("https://app.wingify.com/#/login");
    await page.waitForTimeout(2000);

    await page.fill("#login-username", VWO_USER);
    await page.fill("#login-password", VWO_PASS);
    await page.waitForTimeout(1500);

    await page.click("#js-login-btn");

    // Wait for login to actually complete before snapshotting storage —
    // otherwise the auth cookie isn't set yet and the saved state is empty.
    await page.waitForURL(/#\/(dashboard|home)/, { timeout: 15000 });
    await page.waitForTimeout(3000);

    await context.storageState({ path: "./user-session.json" });
    console.log("Session saved to user-session.json ✅");

    await page.waitForTimeout(2000);
    await browser.close();

}

saveSession();
saveAdminSession();