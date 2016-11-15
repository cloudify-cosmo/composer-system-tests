'use strict';

exports.login = function(username, password){
    exports.setUsername(username);
    exports.setPassword(password);
    return exports.submit();
};

exports.loginDefault = function(){
    return exports.login('composer', 'composer');
};

exports.setUsername = function(username){
    return element(by.id('username')).sendKeys(username);
};

exports.setPassword = function(password){
    return element(by.id('password')).sendKeys(password);
};

exports.submit = function(){
    return $('[ng-click="login()"]').click();
};
