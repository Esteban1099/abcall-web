module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    browsers: ['ChromeHeadless'], // Usar Chrome en modo headless
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    singleRun: true, // Finaliza el proceso después de ejecutar las pruebas
    autoWatch: false, // No sigue observando cambios
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'], // Necesario para algunos entornos CI
        singleRun: true, // Para asegurarse de que Karma no se mantenga en ejecución después de las pruebas
        restartOnFileChange: false, // Para evitar reinicios innecesarios
      }
    }
  });
};
