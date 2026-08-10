import { test, expect } from '@playwright/test';

test.use({
  // Use real Chrome channel with clean automation flags
  channel: 'chrome',
  viewport: { width: 1920, height: 1080 },
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  locale: 'en-IN',
  timezoneId: 'Asia/Kolkata',
  ignoreHTTPSErrors: true,
  launchOptions: {
    args: [
      '--disable-http2', // Bypasses HTTP/2 frame inspection
      '--disable-blink-features=AutomationControlled', // Prevents navigator.webdriver flag
      '--test-type', // Prevents unsupported flag warning banners
      '--no-sandbox',
    ],
  },
});

test('MakeMyTrip flight search - Optimized Chromium', async ({ page }) => {
  // 1. Conceal navigator.webdriver
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });

  // 2. Abort analytics and tracking domains that hold network sockets open
  await page.route(
    '**/*{google-analytics,doubleclick,googlesyndication,facebook,omtrdc,demdex,rubiconproject}*',
    (route) => route.abort()
  );

  try {
    console.log('Navigating directly to Flight Search...');
    
    // Bypasses the root '/' Akamai challenge by opening the flights route directly
    await page.goto('https://www.makemytrip.com/flights/', {
      waitUntil: 'commit', // Resolves as soon as HTTP response headers are received
      timeout: 30000,
    });

    // 3. Wait explicitly for the core page container
    const mmtLogo = page.locator('a[data-cy="mmtLogo"]');
    await mmtLogo.waitFor({ state: 'visible', timeout: 30000 });

    console.log('Page loaded successfully. Title:', await page.title());
    await expect(mmtLogo).toBeVisible();
  } catch (error) {
    console.error('Test execution failed:', error);
    throw error;
  }
});