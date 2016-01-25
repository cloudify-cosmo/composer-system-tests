
'use strict';


exports.enterName = function(newName){
    var nameInput = by.model('item.name');
    element( nameInput ).sendKeys(newName + '\n');

};

exports.enterUrl = function(url){
    var nameInput = by.model('item.url');
    element( nameInput ).sendKeys(url + '\n');

};

exports.save = function(){
    return $('[ng-click="save($files)"]').click();
};


exports.cancel = function(){
    return $('[ng-click="cancel()"]').click();
};



