'use strict';

process.env.NODE_PATH = 'src';
require('module').Module._initPaths();
console.log('node path changed');

beforeEach(function(){
    browser.driver.manage().window().maximize();
    browser.getCapabilities().then(function(cap) {
        browser.browserName = cap.get('browserName');
    });
});

browser.getLogger = function(name){

    var logger = require('log4js').getLogger(name);

    function logMe ( level ){
        return function(msg){

            try {
                browser.sleep(1).then(function () {
                    try {
                        logger[level](msg);
                    }catch(e){
                        console.log(e);
                    }
                });

            }catch(e){
                console.log(e);
            }
        };
    }

    return {
        info : logMe('info'),
        warn : logMe('warn'),
        error : logMe('error'),
        debug : logMe('debug'),
        trace : logMe('trace')
    };
};