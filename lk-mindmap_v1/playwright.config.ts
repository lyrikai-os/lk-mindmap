import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.e2e.ts',
  workers: 1,
  timeout: 60000,
  expect: { timeout: 15000 },
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:5210',
    trace: 'off',
  },
  webServer: {
    command: 'npx vite --host 127.0.0.1 --port 5210 --strictPort',
    url: 'http://127.0.0.1:5210',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
