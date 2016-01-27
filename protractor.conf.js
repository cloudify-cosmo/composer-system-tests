// in case of new env and missing: /node_modules/protractor/selenium/chromedriver.exe run:
// node_modules/protractor/bin/webdriver-manager update

var timeout = 60000;

var spec= process.env.COMPOSER_SPEC || 'spec/**/*.spec.js';


function get_suite(file){
    return [ 'spec/normalize.js', file+'.spec.js'];
}

// An example configuration file.
exports.config = {
    directConnect: true,
    seleniumAddress: 'http://localhost:4444/wd/hub',

    //chromeOnly: true,
    //  chromeDriver: '../node_modules/protractor/npm run update-webdriver',


    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome',

        'chromeOptions': {
            // Get rid of --ignore-certificate yellow warning
            args: ['--no-sandbox', '--test-type=browser', '--disable-extensions'],
            // Set download path and avoid prompting for download even though
            // this is already the default on Chrome but for completeness
            prefs: {
                'download': {
                    'prompt_for_download': false,
                    'default_directory': './e2e/tmp'
                }
            }
        }
    },

    // Framework to use. Jasmine 2 is recommended.
    framework: 'jasmine2',

    // Spec patterns are relative to the current working directly when
    // protractor is called.

    allScriptsTimeout: timeout,


    suites: {
        'plugins' : get_suite('spec/definitions/plugins'),
        'resources' : get_suite('spec/resources/resources'),
        'downloadBlueprint' : get_suite('spec/source/downloadBlueprint'),
        'nodeTypes' : get_suite('spec/stencils/nodeTypes')
    },
    baseUrl: process.env.PROTRACTOR_BASE_URL || 'http://localhost:9000',

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: timeout,
        allScriptsTimeout: timeout
    }
};
