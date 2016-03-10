
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


exports.cancel = function(){
    return $('[ng-click="cancel()"]').click();
};
exports.cancelUsingSelector = function(){
    element(by.css('.modal.fade.in .cancel')).click();
    return browser.sleep(500); //waiting when modal close
};



