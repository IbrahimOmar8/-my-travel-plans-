import { test, expect } from "@playwright/test";

test("Tour page shows seeded approved reviews and aggregate", async ({
  page
}) => {
  await page.goto("/en/tours/classic-egypt-8-days");
  await expect(page.getByText(/Worth every penny/i)).toBeVisible();
  await expect(page.getByText(/Honeymoon, done right/i)).toBeVisible();
});

test("Tour page exposes TouristTrip + AggregateRating JSON-LD", async ({
  page
}) => {
  await page.goto("/en/tours/classic-egypt-8-days");
  const html = await page.content();
  expect(html).toContain('"@type":"TouristTrip"');
  expect(html).toContain('"@type":"AggregateRating"');
  expect(html).toContain('"@type":"FAQPage"');
  expect(html).toContain('"@type":"BreadcrumbList"');
});

test("Review submission creates a pending review", async ({ request }) => {
  const res = await request.post("/api/reviews", {
    data: {
      tourSlug: "nile-cruise-5-days",
      name: "Playwright Reviewer",
      rating: 4,
      body: "Lovely sunset on the felucca."
    }
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.ok).toBe(true);
});

test("Review API rejects missing rating", async ({ request }) => {
  const res = await request.post("/api/reviews", {
    data: { tourSlug: "nile-cruise-5-days", name: "x", body: "y" }
  });
  expect(res.status()).toBe(400);
});

test("Review API rejects unknown tour", async ({ request }) => {
  const res = await request.post("/api/reviews", {
    data: {
      tourSlug: "does-not-exist",
      name: "x",
      body: "y",
      rating: 3
    }
  });
  expect(res.status()).toBe(404);
});

test("Newsletter signup endpoint accepts a valid email", async ({ request }) => {
  const res = await request.post("/api/subscribe", {
    data: { email: `pw-${Date.now()}@example.com`, locale: "en", source: "e2e" }
  });
  expect(res.status()).toBe(200);
});

test("Newsletter signup rejects an invalid email", async ({ request }) => {
  const res = await request.post("/api/subscribe", {
    data: { email: "not-an-email" }
  });
  expect(res.status()).toBe(400);
});

test("WhatsApp floating button links to wa.me", async ({ page }) => {
  await page.goto("/en");
  const link = page.getByRole("link", { name: /WhatsApp/i });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", /wa\.me/);
});

test("Admin reviews page lists seed reviews", async ({ request }) => {
  const auth =
    "Basic " + Buffer.from("admin:nile-horizons-demo").toString("base64");
  const res = await request.get("/admin/reviews", {
    headers: { Authorization: auth }
  });
  expect(res.status()).toBe(200);
  const html = await res.text();
  expect(html).toContain("Worth every penny");
});
