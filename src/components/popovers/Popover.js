
'use strict';

exports.clickNo = function(){
    return element(by.css('.popover .cancelBtn')).click();
};
exports.clickYes = function(){
    return element(by.css('.popover .okBtn')).click();
};
exports.isPopoverDisplayed = function(){
    return element(by.css('.popover')).isDisplayed().then(function(result) {
        return result;
    });
};


