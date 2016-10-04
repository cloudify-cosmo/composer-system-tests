'use strict';

exports.openImportModal = function(){
    element(by.css('#firstHeader .headTitle .dropdown-toggle')).click();
    element(by.css('label[ng-click="importBlueprint()"]')).click();
    return browser.sleep(2000); // waiting for modal animation to finish
};
