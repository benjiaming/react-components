// filepath: /workspaces/react-components/nested-checkboxes/vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Use JSDOM for DOM-based tests
    setupFiles: ['./setupTests.ts'], // Optional: Add setup file for additional configurations
    globals: true, // Enable global variables like `describe`, `it`, `expect`       
  },
});

