'use strict';

/**
 * injects some useful scripts on dom
 */
exports.inject = function(){
    browser.executeScript( require('./d3event').d3Click);
    browser.executeScript( require('./d3event').d3Event);
    browser.executeScript( require('./jquery.simulate').simulate);
    browser.sleep(1000);

};

exports.page = require('./TopologyPage');

