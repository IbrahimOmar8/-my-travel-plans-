import { test, expect } from "@playwright/test";

test("Inquiry form submits and shows confirmation", async ({ page }) => {
  await page.goto("/en/contact");
  await page.getByLabel("Full name").fill("Playwright Tester");
  await page.getByLabel("Email").fill("playwright@example.com");
  await page.getByLabel("Country").fill("Egypt");
  await page.getByLabel("Tell us about your trip").fill(
    "Automated test inquiry"
  );

  await page.getByRole("button", { name: /Request my quote/i }).click();
  await expect(
    page.getByText(/a trip designer will be in touch/i)
  ).toBeVisible({ timeout: 10_000 });
});

test("Inquiry API rejects missing fields", async ({ request }) => {
  const res = await request.post("/api/inquiry", { data: {} });
  expect(res.status()).toBe(400);
});

test("Inquiry API persists the row", async ({ request }) => {
  const res = await request.post("/api/inquiry", {
    data: {
      name: "API Tester",
      email: "api-test@example.com",
      tourSlug: "classic-egypt-8-days",
      tourTitle: "Classic Egypt"
    }
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.ok).toBe(true);
  expect(body.id).toMatch(/^c/);
});
