const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Base URL of your dev server (Vite)
    baseUrl: 'http://localhost:5173',

    // Support file
    supportFile: 'cypress/support/e2e.{js,ts}',

    // Spec pattern
    specPattern: 'cypress/e2e/**/*.cy.spec.{js,jsx,ts,tsx}',

    // Video recording
    video: true,
    videosFolder: 'cypress/videos',

    // Screenshots
    screenshotsFolder: 'cypress/screenshots',

    // Viewport
    viewportWidth: 1280,
    viewportHeight: 720,

    // Retry settings
    retries: {
      runMode: 2,   // CI
      openMode: 0,  // Local
    },

    // Disable Chrome web security (useful for localhost/CORS testing)
    chromeWebSecurity: false,

    // Setup node events (plugins)
    setupNodeEvents(on, config) {
      // Custom task: log to terminal
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });

      // FIXED: before:browser:launch for Cypress 13+ / 15+
      on('before:browser:launch', (browser, launchOptions) => {
        // Optional: debug what browser is launching
        // console.log('Launching browser:', browser.name, browser.family);

        // ── Chromium-based browsers (Chrome, Edge, Brave, etc.) ──
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // Auto-open DevTools in real Chrome
          launchOptions.args.push('--auto-open-devtools-for-tabs');

          // Safe & recommended flags (especially in Docker/CI)
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-dev-shm-usage');
          launchOptions.args.push('--disable-features=ImprovedCookieControls');
        }

        // ── Electron (Cypress built-in browser) ──
        if (browser.name === 'electron') {
          // Electron uses a plain object for preferences (not an array!)
          launchOptions.preferences.devTools = true;     // Auto-open DevTools
          launchOptions.preferences.width = 1280;
          launchOptions.preferences.height = 720;
          launchOptions.preferences.resizable = true;

          // Optional: disable GPU in Electron too
          launchOptions.args.push('--disable-gpu');
        }

        // ── Firefox (if you ever use it) ──
        if (browser.family === 'firefox') {
          // Opens DevTools on start
          launchOptions.preferences['devtools.toolbox.selectedTool'] = 'inspector';
          launchOptions.preferences['devtools.toolbox.footer.height'] = 500;
        }

        return launchOptions;
      });

      // Return modified config (important!)
      return config;
    },
  },

  // Component testing config (React + Vite)
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});