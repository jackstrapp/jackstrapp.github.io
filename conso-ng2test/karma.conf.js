// // Karma configuration
// // Generated on Wed Oct 19 2016 16:24:07 GMT+0200 (Paris, Madrid (heure d’été))

// module.exports = function (config) {
//     config.set({
//         // base path that will be used to resolve all patterns (eg. files, exclude)
//         basePath: '',
//         // frameworks to use
//         // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
//         frameworks: ['jasmine'],
//         plugins: [
//             require('karma-jasmine'),
//             require('karma-chrome-launcher'),
//             require('karma-jasmine-html-reporter'), // click "Debug" in browser to see it
//             require('karma-htmlfile-reporter') // crashing w/ strange socket error
//         ],
//         customLaunchers: {
//             // From the CLI. Not used here but interesting
//             // chrome setup for travis CI using chromium
//             Chrome_travis_ci: {
//                 base: 'Chrome',
//                 flags: ['--no-sandbox']
//             }
//         },
//         // list of files / patterns to load in the browser
//         files: [
//             // { pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: true },
//             // { pattern: 'karma-test-shim.js', included: true, watched: true },
//             // './systemjs.config.js',
//             // './app/Services/CompteurService.spec.js',


//             ////



//             // System.js for module loading
//             'node_modules/systemjs/dist/system.src.js',

//             // Polyfills
//             'node_modules/core-js/client/shim.js',
//             'node_modules/reflect-metadata/Reflect.js',

//             // zone.js
//             'node_modules/zone.js/dist/zone.js',
//             'node_modules/zone.js/dist/long-stack-trace-zone.js',
//             'node_modules/zone.js/dist/proxy.js',
//             'node_modules/zone.js/dist/sync-test.js',
//             'node_modules/zone.js/dist/jasmine-patch.js',
//             'node_modules/zone.js/dist/async-test.js',
//             'node_modules/zone.js/dist/fake-async-test.js',

//             // RxJs
//             { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
//             { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

//             // Paths loaded via module imports:
//             // Angular itself
//             { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
//             { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },

//             { pattern: 'systemjs.config.js', included: false, watched: false },
//             'karma-test-shim.js',

//             ///ACTUAL FREAKIN' TESTS
//             './app/Services/CompteurService.spec.js'
//         ],
//         // list of files to exclude
//         exclude: [
//         ],
//         // preprocess matching files before serving them to the browser
//         // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
//         preprocessors: {
//         },
//         // test results reporter to use
//         // possible values: 'dots', 'progress'
//         // available reporters: https://npmjs.org/browse/keyword/karma-reporter
//         reporters: ['progress', 'kjhtml'],
//         // web server port
//         port: 9876,
//         // enable / disable colors in the output (reporters and logs)
//         colors: true,
//         // level of logging
//         // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
//         logLevel: config.LOG_INFO,
//         // enable / disable watching file and executing tests whenever any file changes
//         autoWatch: true,
//         // start these browsers
//         // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
//         browsers: ['Chrome'],
//         // Continuous Integration mode
//         // if true, Karma captures browsers, runs the tests and exits
//         singleRun: false,
//         // Concurrency level
//         // how many browser should be started simultaneous
//         concurrency: Infinity,

//     })
// }


// #docregion
module.exports = function(config) {

  var appBase    = 'app/';       // transpiled app JS and map files
  var appSrcBase = 'app/';       // app source TS files
  var appAssets  = 'app/'; // component assets fetched by Angular's compiler

  var testBase    = 'app/'; //'testing/';       // transpiled test JS and map files
  var testSrcBase = 'app/'; //'testing/';       // test source TS files

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'), // click "Debug" in browser to see it
      require('karma-htmlfile-reporter') // crashing w/ strange socket error
    ],

    customLaunchers: {
      // From the CLI. Not used here but interesting
      // chrome setup for travis CI using chromium
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    files: [
      // System.js for module loading
      'node_modules/systemjs/dist/system.src.js',

      // Polyfills
      'node_modules/core-js/client/shim.js',
      'node_modules/reflect-metadata/Reflect.js',

      // zone.js
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      // RxJs
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

      // Paths loaded via module imports:
      // Angular itself
      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },

      { pattern: 'systemjs.config.js', included: false, watched: false },
    //   { pattern: 'systemjs.config.extras.js', included: false, watched: false },
      'karma-test-shim.js',

      // transpiled application & spec code paths loaded via module imports
      { pattern: appBase + '**/*.js', included: false, watched: true },
      { pattern: testBase + '**/*.js', included: false, watched: true },


      // Asset (HTML & CSS) paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      { pattern: appBase + '**/*.html', included: false, watched: true },
      { pattern: appBase + '**/*.css', included: false, watched: true },

      // Paths for debugging with source maps in dev tools
      { pattern: appSrcBase + '**/*.ts', included: false, watched: false },
      { pattern: appBase + '**/*.js.map', included: false, watched: false },
      { pattern: testSrcBase + '**/*.ts', included: false, watched: false },
      { pattern: testBase + '**/*.js.map', included: false, watched: false }
    ],

    // Proxied base paths for loading assets
    proxies: {
      // required for component assets fetched by Angular's compiler
      "/app/": appAssets
    },

    exclude: [],
    preprocessors: {},
    // disabled HtmlReporter; suddenly crashing w/ strange socket error
    reporters: ['progress', 'kjhtml'],//'html'],

    // HtmlReporter configuration
    htmlReporter: {
      // Open this file to see results in browser
      outputFile: '_test-output/tests.html',

      // Optional
      pageTitle: 'Unit Tests',
      subPageTitle: __dirname
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  })
}
