import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://abcall-web-460072ffa983.herokuapp.com/es-CO/',
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
});
