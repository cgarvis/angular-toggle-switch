// Karma configuration

module.exports = function(config) {

    var getBrowsers = function() {
        if (process.env.KARMA_BROWSERS) {
            return process.env.KARMA_BROWSERS.replace(' ', '').split(',')
        } else {
            return ['Chrome']
        }
    };

    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',
        frameworks: ['jasmine'],
        // list of files / patterns to load in the browser
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'angular-toggle-switch.js',
            'test/*.js'
        ],
        port: 9018,
        runnerPort: 9101,
        captureTimeout: 60000,
        browsers: getBrowsers(),
        reporters: ['progress'],
        autoWatch: false,
        plugins: ['karma-jasmine', 'karma-chrome-launcher']
    });

};
