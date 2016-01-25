'use strict';

exports.login = function(username){
    exports.setUsername(username);
    return exports.submit();
};

exports.setUsername = function(username){
    return element(by.model('user.name')).sendKeys(username);
};

exports.submit = function(){
    return $('[ng-click="login()"]').click();
};
