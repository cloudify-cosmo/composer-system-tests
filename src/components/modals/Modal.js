
'use strict';


exports.enterName = function(newName){

    var nameInput = by.model('item.name');

    element( nameInput ).sendKeys(newName + '\n');

};

exports.enterUrl = function(url, type){
    var nameInput;
    if(type ==='imports'){
        nameInput = by.model('item.location');
    }else{
        nameInput = by.model('item.url');
    }
    element( nameInput ).sendKeys(url + '\n');

};

exports.save = function(){
    return $$('[ng-click="save($files)"]').click();
};
exports.done = function(){
    return $$('[ng-click="submit()"]').click();
};

exports.cancel = function(){
    return $$('[ng-click="cancel()"]').click();
};

exports.dismiss = function(){
    return $$('[ng-click="$dismiss()"]').click();
};

exports.cancelUsingSelector = function(){
    element(by.css('.modal.fade.in .cancel')).click();
    return browser.sleep(500); //waiting when modal close
};

exports.selectEditorField = function(){
    element(by.css('#propAceEditor')).click();//select editor field
    return browser.actions().doubleClick($('div.ace_content')).perform();//select all value in editor field
};

exports.renameValueInEditor = function(newValue){
    return element(by.css('textarea.ace_text-input')).sendKeys(newValue);
};

exports.copyToEditor = function(){
    return $('[ng-click="copyToEditor()"]').click();
};

exports.cancelUsingSelector = function(){
    element(by.css('.modal.fade.in .cancel')).click();
    return browser.sleep(500); //waiting when modal close
};

exports.enterFilePath = function(url){
    return $('input[type="file"]').sendKeys(url);
    // doesn't work for phantomjs getting: "A Jasmine spec timed out. Resetting the WebDriver Control Flow." // see issue : https://github.com/ariya/phantomjs/issues/10993
};




