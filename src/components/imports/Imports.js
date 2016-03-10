'use strict';

exports.isElementDisplayed = function(el){
    return el.isDisplayed().then(function(result) {
        return result;
    });
};

exports.isElementPresent = function(el){
    return el.isPresent().then(function(result) {
        return result;
    });
};
exports.countElements = function(el){
    return el.then(function(result){
        return result.length;
    });
};
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
    return $('[ng-click="openAddImportsModal()"]').click();
};

exports.checkFirstNodeType = function(){
    return element.all(by.repeater('nodeType in globals.stencils.nodeTypes')).then(function(result){
        return result[0].element(by.css('.nodeType')).getText();
    });
};

exports.findSpecificContainerOnTopologyPage = function(){
    return element(by.cssContainingText('.stencil-type', 'cloudify.docker')).element(by.xpath('../../..')).element(by.cssContainingText('.name', 'Container'));
};

exports.findSpecificUsedOnImportsPage = function(){
    return element(by.cssContainingText('.nodeType','cloudify.docker.Container')).element(by.xpath('..')).element(by.css('.action span'));
};

exports.findSpecificUrl = function(){
    return element(by.cssContainingText('.importsList .item-block','http://getcloudify.org.s3.amazonaws.com/spec/docker-plugin/1.3.1/plugin.yaml'));
};