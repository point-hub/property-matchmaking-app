import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import * as esbuild from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { defineConfig } from 'cypress';
// @ts-expect-error cypress-mochawesome-reporter does not provide TypeScript types for /plugin.
import mochawesome from 'cypress-mochawesome-reporter/plugin';

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,

  video: false,

  reporter: 'cypress-mochawesome-reporter',

  reporterOptions: {
    code: false,
    charts: false,
    saveJson: true,
    reportDir: `cypress/reports/html/${process.env.REPORT_DIR || ''}`,
    reportPageTitle: 'Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    screenshotsFolder: 'cypress/screenshots',
  },

  e2e: {
    specPattern: '**/*.feature',
    baseUrl: 'http://localhost:4173',
    defaultBrowser: 'chrome',
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions,
    ): Promise<Cypress.PluginConfigOptions> {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [esbuild.createEsbuildPlugin(config)],
        }),
      );

      mochawesome(on);

      return config;
    },
  },
});