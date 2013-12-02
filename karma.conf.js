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
        basePath: './',
        frameworks: ['jasmine'],
        // list of files / patterns to load in the browser
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'angular-toggle-switch.js',
            'test/*.js'
        ],
        // web server port
        port: 9018,
        // cli runner port
        runnerPort: 9101,
        captureTimeout: 60000,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        browsers: getBrowsers(),
        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit'
        reporters: ['progress'],
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
        // Auto run tests on start (when browsers are captured) and exit
        singleRun: false,
        plugins: ['karma-jasmine', 'karma-chrome-launcher']
    });

};