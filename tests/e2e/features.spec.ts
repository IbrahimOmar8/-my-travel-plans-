import { test, expect } from "@playwright/test";

test("Search page returns ranked hits", async ({ page }) => {
  await page.goto("/en/search?q=cairo");
  await expect(page.getByText(/Results for/i)).toBeVisible();
  await expect(page.getByText(/Classic Egypt/i).first()).toBeVisible();
});

test("Search rejects very short queries", async ({ page }) => {
  await page.goto("/en/search?q=a");
  await expect(page.getByText(/at least two/i)).toBeVisible();
});

test("Search shows empty state for nonsense", async ({ page }) => {
  await page.goto("/en/search?q=zzzzqqqq");
  await expect(page.getByText(/No matches/i)).toBeVisible();
});

test("Wishlist is empty by default and saves a tour", async ({ page }) => {
  await page.goto("/en/wishlist");
  await expect(page.getByText(/Nothing saved yet/i)).toBeVisible();

  await page.goto("/en/tours");
  await page
    .getByRole("button", { name: /Save|Remove from wishlist/i })
    .first()
    .click();

  await page.goto("/en/wishlist");
  await expect(page.getByText(/Nothing saved yet/i)).not.toBeVisible();
});

test("Privacy page renders", async ({ page }) => {
  await page.goto("/en/privacy");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /Privacy notice/i
  );
  await expect(page.getByText(/Plausible/)).toBeVisible();
});

test("Print page renders itinerary days", async ({ page }) => {
  await page.goto("/en/tours/classic-egypt-8-days/print", {
    waitUntil: "domcontentloaded"
  });
  await expect(page.locator("h1")).toContainText(/Classic Egypt/);
  await expect(page.getByText(/Day 1/i)).toBeVisible();
  await expect(page.getByText(/Day 8/i)).toBeVisible();
});

test("Tour OG image endpoint returns a PNG", async ({ request }) => {
  const res = await request.get(
    "/en/tours/classic-egypt-8-days/opengraph-image"
  );
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("image/png");
});

test("Blog OG image endpoint returns a PNG", async ({ request }) => {
  const res = await request.get(
    "/en/blog/grand-egyptian-museum-guide/opengraph-image"
  );
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("image/png");
});

test("Image gallery on tour page exposes secondary photos", async ({ page }) => {
  await page.goto("/en/tours/classic-egypt-8-days");
  const images = page.locator("img").filter({ hasNotText: "" });
  await expect(await images.count()).toBeGreaterThan(3);
});
