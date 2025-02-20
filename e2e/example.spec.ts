import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  page.on("response", (response) => {
    console.log("Redirected to:", response.url());
  });

  await page.goto("http://app/api/auth/signin");

  await expect(page).toHaveURL(
    /http:\/\/localhost:9000\/if\/flow\/default-authentication-flow\/.+/,
  );
});
