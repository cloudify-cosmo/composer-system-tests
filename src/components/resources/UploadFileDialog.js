'use strict';



exports.setFilename = function( name ){
    return $('.systemTestSupport input').sendKeys( name );
};

exports.clickAddFile = function(){
    return $('.systemTestSupport button').click();
};

exports.clickSave = function(){
    $('[ng-click="save($files)"]').click();
    return browser.sleep(2000); // fade out effect

};

exports.cancel = function(){
    $('button[ng-click="cancel()"]').click();
    return browser.sleep(2000); // fade out effect
};

exports.uploadFile = function( name ){
    exports.setFilename(name);
    exports.clickAddFile();
    return exports.clickSave();
};
