import {defineConfig} from 'cypress'

export default defineConfig({

  e2e: {
    'baseUrl': 'http://localhost:4200/auth',
  },


  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }

})
