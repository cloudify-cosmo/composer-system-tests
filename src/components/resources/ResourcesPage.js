'use strict';



exports.addFolder = function(){
    return $('[ng-click="addResourceFolder()"]').click();
};

exports.openUploadFileDialog = function(){
    return $('[ng-click="addResourceFile()"]').click();
};

exports.getResources = function(){
    return $$('ul.tree-selector>li'); // $$ more than one element
};


exports.countResources = function(){
    return exports.getResources().count();
};


exports.addSystemTestSupport = function(){
    browser.getCurrentUrl().then(function( url ){
        url = url + '?systemTestSupport=true';
        browser.get(url);
        browser.sleep(3000);
    });
};

exports.deleteItem = function(number){
    if(!number){number = 0;}
    browser.actions().mouseMove(element.all(by.css('.name')).get(number)).perform();
    return $$('.icon-closed').get(number).click();
};

exports.selectFolder = function(number){
    if(!number){number = 0;}
    return browser.actions().mouseMove(element.all(by.css('.name')).get(number)).click().perform();
};

exports.openFolder = function(number){
    if(!number){number = 0;}
    return element.all(by.css('.fa-caret-right')).get(number).click();
};

exports.closeFolder = function(number){
    if(!number){number = 0;}
    return element.all(by.css('.fa-caret-down')).get(number).click();
};
exports.renameItem = function(number, name){
    if(!number){number = 0;}
    browser.actions().doubleClick($$('.name').get(number)).perform();
    element.all(by.model('editedNode.newName')).get(number).clear().sendKeys(name);
    return browser.actions().sendKeys(protractor.Key.ENTER).perform();
};

