import { test, expect } from "@playwright/test";

test("RSS feed returns XML with all locale posts", async ({ request }) => {
  const res = await request.get("/feed.xml");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("application/rss+xml");
  const body = await res.text();
  expect(body).toContain("Grand Egyptian Museum");
  expect(body).toContain("Большой Египетский музей");
  expect(body).toContain("Büyük Mısır Müzesi");
});

test("Manifest is served as JSON", async ({ request }) => {
  const res = await request.get("/manifest.webmanifest");
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.name).toBe("Nile Horizons");
  expect(body.start_url).toBe("/en");
  expect(body.display).toBe("standalone");
});

test("Icon and apple-icon return PNG", async ({ request }) => {
  const icon = await request.get("/icon");
  expect(icon.status()).toBe(200);
  expect(icon.headers()["content-type"]).toContain("image/png");

  const apple = await request.get("/apple-icon");
  expect(apple.status()).toBe(200);
  expect(apple.headers()["content-type"]).toContain("image/png");
});

test("Layout links the manifest", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator('link[rel="manifest"]')).toHaveCount(1);
  await expect(page.locator('meta[name="theme-color"]')).toHaveCount(1);
});

test("Compare page with two tours renders both columns", async ({ page }) => {
  await page.goto(
    "/en/compare?tours=classic-egypt-8-days,nile-cruise-5-days"
  );
  await expect(page.locator("h1")).toContainText(/Side-by-side/i);
  await expect(page.getByText(/Classic Egypt/i).first()).toBeVisible();
  await expect(page.getByText(/Nile Cruise/i).first()).toBeVisible();
});

test("Compare empty state shows guidance", async ({ page }) => {
  await page.goto("/en/compare");
  await expect(page.getByText(/Pick at least two/i)).toBeVisible();
});

test("Plan-trip wizard steps forward through fields", async ({ page }) => {
  await page.goto("/en/plan-trip");
  await expect(page.locator("h1")).toContainText(/dream trip/i);
  await page.locator("label", { hasText: "Cairo" }).first().click();
  await page.getByRole("button", { name: /^Next$/ }).click();
  await expect(page.getByText(/Trip length/i).first()).toBeVisible();
});

test("Availability calendar is shown on tour pages with departures", async ({
  page
}) => {
  await page.goto("/en/tours/classic-egypt-8-days");
  await expect(page.getByText(/Highlighted dates/i)).toBeVisible();
});
