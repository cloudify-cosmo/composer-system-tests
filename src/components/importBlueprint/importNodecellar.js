'use strict';

exports.openImportModal = function(){
    element(by.css('.headerMenu')).click();
    $('[ng-click="importBlueprint()"]').click();
    return browser.sleep(500);//waiting when modal appears
};
