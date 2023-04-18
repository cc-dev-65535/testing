import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.tylertech.com');
});

test.describe("homepage", () => {
  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Tyler Technologies/);
  });

  test('twitter link', async ({ page, context }) => {
    const pagePromise = context.waitForEvent('page');
    await page.getByTitle("Twitter").click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL("https://twitter.com/tylertech");
  });

  test('homepage screenshot', async ({ page, context }) => {
    await page.screenshot({ path: "screenshots/tyler-technologies-home-page-" + context.browser()?.browserType().name() + ".png", fullPage: true });
  });
});