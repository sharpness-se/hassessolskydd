import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // env: {
    //   REACT_APP_BACKEND_URL:"http://localhost:8080"
    // }
  },
});
