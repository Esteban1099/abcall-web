import {defineConfig} from 'cypress'

export default defineConfig({

  e2e: {
    'baseUrl': 'https://abcall-web-460072ffa983.herokuapp.com/es-CO/',

  },

  // e2e: {
  //   baseUrl: 'http://localhost:4200/auth',
  // },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }

})
