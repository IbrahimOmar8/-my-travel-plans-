import { test, expect } from "@playwright/test";

test("Health endpoint returns ok with DB check", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.status).toBe("ok");
  expect(body.checks.database).toBe("ok");
  expect(body.integrations).toBeDefined();
});

test("Honeypot accepts the inquiry but discards spam", async ({ request }) => {
  const res = await request.post("/api/inquiry", {
    data: {
      name: "Spam Bot",
      email: "bot@example.com",
      website: "https://evil.example"
    }
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.id).toBe("spam");
});

test("Tour filters compose via URL params", async ({ page }) => {
  await page.goto("/en/tours?category=Cultural&duration=medium&sort=rating");
  await expect(page.getByText(/match(es)? your filters/i)).toBeVisible();
  await expect(page.getByText(/Top rated/i)).toBeVisible();
});

test("Tour filters clear-all works", async ({ page }) => {
  await page.goto("/en/tours?category=Cultural&maxPrice=2500");
  const clearLink = page.getByRole("link", { name: /Clear \(/i });
  await expect(clearLink).toBeVisible();
});

test("404 page renders something useful for unknown paths", async ({ page }) => {
  const res = await page.goto("/en/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText(/Lost in the desert|wandered/i);
});

test("My-trip lookup form rejects missing fields", async ({ request }) => {
  const res = await request.post("/api/my-trip", { data: {} });
  expect(res.status()).toBe(400);
});

test("My-trip lookup 404s for unknown booking", async ({ request }) => {
  const res = await request.post("/api/my-trip", {
    data: { id: "nope", email: "nope@example.com" }
  });
  expect(res.status()).toBe(404);
});

test("Team page lists designers", async ({ page }) => {
  await page.goto("/en/team");
  await expect(page.getByText(/Yasmin Hassan/)).toBeVisible();
  await expect(page.getByText(/Karim Saleh/)).toBeVisible();
  await expect(page.getByText(/Mariam El-Sayed/)).toBeVisible();
});

test("Admin analytics dashboard renders with auth", async ({ request }) => {
  const auth =
    "Basic " + Buffer.from("admin:nile-horizons-demo").toString("base64");
  const res = await request.get("/admin/analytics", {
    headers: { Authorization: auth }
  });
  expect(res.status()).toBe(200);
  const html = await res.text();
  expect(html).toContain("Inquiry → Booking");
  expect(html).toContain("Top tours");
});

test("Admin analytics requires auth", async ({ request }) => {
  const res = await request.get("/admin/analytics");
  expect(res.status()).toBe(401);
});
