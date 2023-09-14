// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    BASE_URL: 'https://restful-booker.herokuapp.com',
    auth: '/auth',
    booking: '/booking',
  },
  e2e: {
    baseUrl: 'https://practice.expandtesting.com',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
