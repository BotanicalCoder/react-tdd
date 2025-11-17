const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Base URL of your dev server
    // baseUrl: 'http://localhost:3000', // CRA
    baseUrl: 'http://localhost:5173', // Vite

    // Support file (optional, for custom commands)
    supportFile: 'cypress/support/e2e.{js,ts}',

    // Spec pattern
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // Video recording (disable in CI to save space)
    video: true,
    videosFolder: 'cypress/videos',

    // Screenshots
    screenshotsFolder: 'cypress/screenshots',

    // Setup node events (plugins)
    setupNodeEvents(on, config) {
      // Example: Add custom task
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });

      // Auto-open DevTools + disable GPU in headless/CI
      on('before:browser:launch', (browser, launchOptions) => {
        // Works for Electron
        if (browser.name === 'electron') {
          launchOptions.preferences = launchOptions.preferences || [];
          launchOptions.preferences.push({
            devTools: true, // Auto-open DevTools in Electron
          });
        }

        // Works for Chrome, Edge, etc.
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--auto-open-devtools-for-tabs');
        }

        // Optional: Safe defaults for Linux/Docker
        if (browser.name === 'chrome' || browser.name === 'electron') {
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-dev-shm-usage'); // Helps in Docker
        }

        return launchOptions;
      });

      return config;
    },

    // Viewport (mobile-first or desktop)
    viewportWidth: 1280,
    viewportHeight: 720,

    // Retry settings (optional)
    retries: {
      runMode: 2, // CI
      openMode: 0, // Local
    },

    // Disable Chrome web security if testing CORS/localhost
    chromeWebSecurity: false,
  },

  // Optional: Component testing (if you use it)
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite', // or 'webpack'
    },
  },
});
