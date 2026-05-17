import { test, expect } from "@playwright/test";

const AUTH = "Basic " + Buffer.from("admin:nile-horizons-demo").toString("base64");

test("Admin requires authentication", async ({ request }) => {
  const res = await request.get("/admin/inquiries");
  expect(res.status()).toBe(401);
});

test("Admin inquiries lists rows when authed", async ({ request }) => {
  await request.post("/api/inquiry", {
    data: { name: "Admin Smoke", email: "smoke-admin@example.com" }
  });
  const res = await request.get("/admin/inquiries", {
    headers: { Authorization: AUTH }
  });
  expect(res.status()).toBe(200);
  const html = await res.text();
  expect(html).toContain("smoke-admin@example.com");
});

test("CSV export requires authentication", async ({ request }) => {
  const res = await request.get("/api/admin/export?type=inquiries");
  expect(res.status()).toBe(401);
});

test("CSV export returns CSV when authed", async ({ request }) => {
  const res = await request.get("/api/admin/export?type=inquiries", {
    headers: { Authorization: AUTH }
  });
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("text/csv");
  const body = await res.text();
  expect(body.split("\n")[0]).toContain("email");
});
