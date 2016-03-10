'use strict';

/**
 * injects some useful scripts on dom
 */
exports.inject = function(){
    browser.executeScript( require('./d3event').d3Click);
    browser.executeScript( require('./d3event').d3Event);
    browser.executeScript( require('./jquery.simulate').simulate);
    browser.executeScript( require('./dnd_helper').composer);
    //browser.executeScript( require('./showMousePosition').showMousePosition);
    browser.sleep(1000);

};


exports.composerDnd = require('./dnd_helper');