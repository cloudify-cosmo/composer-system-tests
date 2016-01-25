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



exports.getResourceByName = function( name) {
    return exports.getResources().filter(function (e) {
        console.log('resource name is [' + name.toLowerCase().trim() + ']');
        return e.$('.name').getText();
        }).then(function(results){
            console.log('var results: '+ results);
            return results[0];
        });
};

exports.countResources = function(){
    return exports.getResources().count();
};

exports.rename = function( oldName, newName ){
    exports.getResourceByName( oldName).then(function(r){
        browser.actions().doubleClick(r.$('.name')).perform();
        var nameInput = by.model('editedNode.newName');
        element( nameInput ).sendKeys(newName + '\n');
     });
};

exports.delete = function(name ){
     exports.getResourceByName( name).then(function(item){
        console.log('item to delete: '+ item);
         browser.actions().mouseMove(browser.findElement(by.css('[on-delete] span'))).perform();
        return $('[ng-click="deleteItem(treeNode)"]').click();
    });
};


exports.acceptDialog = function(){
    var alertDialog = browser.switchTo().alert();
    alertDialog.accept();
};

exports.addSystemTestSupport = function(){
    browser.getCurrentUrl().then(function( url ){
        url = url + '?systemTestSupport=true';
        browser.get(url);
        browser.sleep(3000);
    });
};


