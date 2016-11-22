'use strict';

exports.openImportsViewDialog = function(){
    element.all(by.css('.icon-view')).get(0).click();
    return browser.sleep(500);//waiting when modal appears
};

exports.openImportsDeletePopover = function(){
    return element.all(by.css('.icon-delete')).get(0).click();
};

exports.openSpecificDeletePopover = function(el){
    return el.element(by.xpath('..')).element(by.css('button.icon-delete')).click();
};

exports.orderByNodeType = function(){
    return element.all(by.css('.sort-order-block')).get(1).click();
};

exports.openAddImportsDialog = function(){
    return $('.add-new-type').click();
};

exports.checkFirstNodeType = function(){
    return element.all(by.repeater('nodeType in globals.stencils.nodeTypes')).then(function(result){
        return result[0].element(by.css('.nodeType')).getText();
    });
};

exports.findSpecificUsedOnImportsPage = function(){
    return element(by.cssContainingText('.nodeType','cloudify.chef.nodes.WebServer')).element(by.xpath('..')).element(by.css('.action span'));
};
