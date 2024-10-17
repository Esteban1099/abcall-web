const { base } = require("@faker-js/faker");

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      baseUrl: "http://localhost:4200"
      // implement node event listeners here
    },
  },
};
