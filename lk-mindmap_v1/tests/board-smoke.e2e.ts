import { test, expect } from '@playwright/test';

test.describe('library + canvas smoke', () => {
  test('shows library chrome, named toolsets, and canvas surface', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText('LYRIKAI')).toBeVisible();
    await expect(page.getByText('YOUR SPACE')).toBeVisible();
    await expect(page.getByRole('button', { name: /Clean Studio/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Sketchbook/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Pinboard/i })).toBeVisible();
    // Clean Studio starts expanded — wait for its actions; do not toggle the title closed.
    await expect(page.locator('.toolset-content')).toBeVisible({ timeout: 20000 });
    await expect(page.getByRole('button', { name: /Add idea/i })).toBeVisible();
    await page.getByRole('button', { name: /Plant your first idea/i }).click();
    await expect(page.locator('.board-surface')).toBeVisible();
    await expect(page.locator('canvas').first()).toBeVisible({ timeout: 20000 });
  });
});
