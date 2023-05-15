import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    // eslint-disable-next-line
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});

// Retry logic to set a fallback baseUrl
// eslint-disable-next-line
if (Cypress.config().baseUrl === 'http://localhost:3000') {
  // eslint-disable-next-line
  Cypress.config().baseUrl = 'http://localhost:4173/';
}
