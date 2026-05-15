import { test, expect } from "@playwright/test";

test("Blog index lists seed posts", async ({ page }) => {
  await page.goto("/en/blog");
  await expect(page.locator("h1")).toContainText(/Field notes from the Nile/i);
  await expect(
    page.getByRole("heading", { name: /Grand Egyptian Museum/i })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /When to visit Luxor/i })
  ).toBeVisible();
});

test("Blog detail renders markdown content", async ({ page }) => {
  await page.goto("/en/blog/grand-egyptian-museum-guide");
  await expect(page.locator("h1")).toContainText(/Grand Egyptian Museum/i);
  await expect(page.locator(".prose-nile")).toContainText(/Tutankhamun/i);
  await expect(page.locator(".prose-nile h2")).toHaveCount(3);
});

test("Russian blog detail uses Russian title", async ({ page }) => {
  await page.goto("/ru/blog/grand-egyptian-museum-guide");
  await expect(page).toHaveTitle(/Большой Египетский музей/);
});

test("Turkish blog detail is translated", async ({ page }) => {
  await page.goto("/tr/blog/when-to-visit-luxor");
  await expect(page.locator("body")).toContainText(/Karnak/i);
  await expect(page.locator("body")).toContainText(/Şubat/);
});
