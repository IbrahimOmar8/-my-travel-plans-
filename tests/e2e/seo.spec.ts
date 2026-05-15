import { test, expect } from "@playwright/test";

test("robots.txt is served and references the sitemap", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toMatch(/User-Agent: \*/);
  expect(body).toMatch(/Disallow: \/admin/);
  expect(body).toMatch(/Sitemap:/);
});

test("sitemap.xml includes localised tour and blog URLs with hreflang", async ({
  request
}) => {
  const res = await request.get("/sitemap.xml");
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain("/en/tours/classic-egypt-8-days");
  expect(body).toContain("/ru/tours/classic-egypt-8-days");
  expect(body).toContain("/tr/tours/classic-egypt-8-days");
  expect(body).toContain("/en/blog/grand-egyptian-museum-guide");
  expect(body).toContain('hreflang="ru"');
});

test("Tour page exposes canonical and hreflang", async ({ page }) => {
  await page.goto("/en/tours/classic-egypt-8-days");
  await expect(
    page.locator('link[rel="canonical"]')
  ).toHaveAttribute("href", /\/en\/tours\/classic-egypt-8-days/);
  for (const lang of ["en", "ru", "tr"]) {
    await expect(
      page.locator(`link[rel="alternate"][hreflang="${lang}"]`)
    ).toHaveCount(1);
  }
});

test("Russian tour page has localised metadata", async ({ page }) => {
  await page.goto("/ru/tours/classic-egypt-8-days");
  await expect(page).toHaveTitle(/Классический Египет/);
});
