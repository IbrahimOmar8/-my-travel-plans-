import { test, expect } from "@playwright/test";

test("English home page renders hero and trust bar", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("h1").first()).toContainText(
    /Travel the cradle of civilisation/i
  );
  await expect(page.getByText(/Average rating/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Tours/i }).first()).toBeVisible();
});

test("Russian home page is translated", async ({ page }) => {
  await page.goto("/ru");
  await expect(page).toHaveTitle(/Nile Horizons/);
  await expect(page.locator("body")).toContainText("Туры");
});

test("Turkish home page is translated", async ({ page }) => {
  await page.goto("/tr");
  await expect(page.locator("body")).toContainText("Turlar");
});

test("Default currency reflects the locale", async ({ page }) => {
  await page.goto("/ru");
  const switcher = page.getByLabel("Currency");
  await expect(switcher).toHaveValue("RUB");
  await page.goto("/en");
  await expect(switcher).toHaveValue("USD");
});

test("Currency switcher persists across navigation", async ({ page }) => {
  await page.goto("/en");
  await page.getByLabel("Currency").selectOption("EUR");
  await page.goto("/en/tours");
  await expect(page.getByLabel("Currency")).toHaveValue("EUR");
});
