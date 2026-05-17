import { test, expect } from "@playwright/test";

test("Tour detail page renders itinerary and book button", async ({ page }) => {
  await page.goto("/en/tours/classic-egypt-8-days");
  await expect(page.locator("h1")).toContainText(/Classic Egypt/i);
  await expect(page.getByText(/Day-by-day itinerary/i)).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Book now/i })
  ).toBeVisible();
});

test("Book button in stub mode redirects to success page", async ({ page }) => {
  await page.goto("/en/tours/classic-egypt-8-days");
  await page.getByRole("button", { name: /Book now/i }).click();
  await page.waitForURL(/\/booking\/success/);
  await expect(
    page.getByText(/Your deposit is confirmed/i)
  ).toBeVisible();
});

test("Checkout API charges in the requested currency", async ({ request }) => {
  const res = await request.post("/api/checkout", {
    data: {
      tourSlug: "nile-cruise-5-days",
      travelers: 2,
      locale: "en",
      currency: "EUR"
    }
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.url).toMatch(/booking\/success/);
  expect(body.demo).toBe(true);
});
