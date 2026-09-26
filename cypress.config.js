const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 90000,
    retries: {
      runMode: 2, // auto-retry 2x kalau gagal saat `cypress run`
      openMode: 1, // auto-retry 1x kalau gagal saat `cypress open` (Test Runner)
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
