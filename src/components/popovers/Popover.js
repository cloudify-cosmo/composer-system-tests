
'use strict';

exports.clickNo = function(number){
    if(!number){number = 0;}
    return element.all(by.css('.popover .cancelBtn')).get(number).click();
};
exports.clickYes = function(number){
    if(!number){number = 0;}
    return element.all(by.css('.popover .okBtn')).get(number).click();
};



