import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://practice.expandtesting.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}'
  },
});
