import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  const uniqueEmail = `test-${Date.now()}@example.com`;
  const password = 'Password123!';

  test('should allow user to register, login, and access dashboard', async ({ page }) => {
    // 1. Register
    await page.goto('/register');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    await page.waitForURL('/dashboard');
    expect(page.url()).toContain('/dashboard');

    // 2. Logout (if UI exists, otherwise delete cookie)
    await page.context().clearCookies();
    await page.goto('/dashboard');

    // Should redirect to login
    await page.waitForURL('/login*');
    expect(page.url()).toContain('/login');

    // 3. Login
    await page.goto('/login');
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    // Wait for redirect to dashboard
    await page.waitForURL('/dashboard');
    expect(page.url()).toContain('/dashboard');
  });
});
