// in case of new env and missing: /node_modules/protractor/selenium/chromedriver.exe run:
// node_modules/protractor/bin/webdriver-manager update

var capabilities = {
    'browserName': 'chrome',
    'chromeOptions': {
        args: ['--no-sandbox', '--test-type=browser', '--disable-extensions'],
        prefs: {
            'download': {
                'prompt_for_download': false,
                'default_directory': './e2e/tmp'
            }
        }
    }
};

var timeout = parseInt(process.env.TIMEOUT || "600000",10);

if ( !!process.env.BROWSER_TYPE ) {
    if ( process.env.BROWSER_TYPE.toLowerCase() === 'phantomjs') {
        capabilities = {
            'browserName': 'phantomjs',
            'platform': 'ANY',
            'version': '',
            //'phantomjs.cli.args': ['--ignore-ssl-errors=true',  '--web-security=false', '--webdriver-loglevel=DEBUG','--debug=true']
            'phantomjs.cli.args': ['--ignore-ssl-errors=true',  '--web-security=false'/*, '--remote-debugger-port=9090'*/]
        }
    }
}

var baseUrl = process.env.PROTRACTOR_BASE_URL || 'http://localhost:9000';
console.log('base url is', baseUrl);

function get_suite(file){
    var result =  [ 'spec/normalize.js', 'spec/' + file+'.spec.js'];
    console.log('suite is',result);
    return result;
}

// An example configuration file.
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    //  chromeDriver: '../node_modules/protractor/npm run update-webdriver',


    // Capabilities to be passed to the webdriver instance.
    capabilities: capabilities,

    // Framework to use. Jasmine 2 is recommended.
    framework: 'jasmine2',

    // Spec patterns are relative to the current working directly when
    // protractor is called.

    allScriptsTimeout: timeout,


    suites: {
        'plugins' : get_suite('definitions/plugins'),
        'resources' : get_suite('resources/resources'),
        'inputsOutputs' : get_suite('inputsOutputs/inputsOutputs'),
        'downloadBlueprint' : get_suite('source/downloadBlueprint'),
        'nodeTypes' : get_suite('stencils/nodeTypes'),
        'imports' : get_suite('imports/imports'),
        'buildNodecellar' : get_suite('demos/buildNodecellar'),
        'inlineTypes' : get_suite('definitions/inlineTypes'),
        'relationships' : get_suite('definitions/relationships'),
        'topologyNodeInfo' : get_suite('topology/nodeInfo'),
        'importNodecellar' : get_suite('importBlueprint/importNodecellar')
    },
    baseUrl: baseUrl,


    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: timeout,
        allScriptsTimeout: timeout
    }
};
