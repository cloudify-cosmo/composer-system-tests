'use strict';

exports.login = function(username){
    exports.setUsername(username);
    exports.submit();
};

exports.setUsername = function(username){
    element(by.model('user.name')).sendKeys(username);
};

exports.submit = function(){
    element(by.css('[ng-click="login()"]')).click();
};
