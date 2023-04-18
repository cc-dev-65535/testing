import { test, expect } from '@playwright/test';
import { Page, BrowserContext } from '@playwright/test';

test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto('https://www.tylertech.com');
});

test.describe("homepage", () => {
  test('has title', async ({ page }: { page: Page }) => {
    await expect(page).toHaveTitle(/Tyler Technologies/);
  });

  test('twitter link', async ({ page, context }: { page: Page, context: BrowserContext }) => {
    const pagePromise: Promise<Page> = context.waitForEvent('page');
    await page.getByTitle("Twitter").click();
    const newPage: Page = await pagePromise;
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL("https://twitter.com/tylertech");
  });

  test('homepage screenshot', async ({ page, context }: {page: Page, context: BrowserContext}) => {
    await page.screenshot({ path: "screenshots/tyler-technologies-home-page-" + context.browser()?.browserType().name() + ".png", fullPage: true });
  });
});