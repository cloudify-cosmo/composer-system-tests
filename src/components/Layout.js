'use strict';


exports.PAGES = {
    TOPOLOGY: 'topology',
    INPUTS_OUTPUTS: 'inputs & outputs',
    DEFINITIONS: 'definitions',
    RESOURCES: 'resources',
    IMPORTS: 'imports',
    SOURCE: 'source'
};

exports.logout = function(){
    return $('.icon-logout').click();
};

exports.goToTopology = function(){
    exports.goTo( exports.PAGES.TOPOLOGY );
};
exports.goToInputsOutputs = function(){
    exports.goTo( exports.PAGES.INPUTS_OUTPUTS );
};
exports.goToDefinitions = function(){
    exports.goTo( exports.PAGES.DEFINITIONS );
};
 exports.goToResources = function(){
    exports.goTo( exports.PAGES.RESOURCES );
};
exports.goToImports = function(){
    exports.goTo( exports.PAGES.IMPORTS );
};



exports.goTo = function( page ){
    return $$('#head .pageSwitchContainer a').filter(function(e){
        return e.getText().then(function( text ){

            var result = text.toLowerCase().trim() === page.toLowerCase().trim();
            //console.log('looking for page',text, page, result );
            return result;
        });
    }).then(function(results){
        results[0].click();
        //console.log('found items', results.length);
       return results;
    });
};

exports.dragAndDrop = function(dragItem, dragDest){
    dragItem.click();
    browser.actions().dragAndDrop(dragItem, dragDest).perform();
};

exports.saveBlueprint = function(){
    $('[ng-click="saveOrUpdateBlueprint()"]').click();
    return browser.sleep(200);
};

exports.validateBlueprint = function() {
  $('[ng-click="validateBlueprint()"]').click();
};

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

exports.addSystemTestSupport = function(){
    browser.getCurrentUrl().then(function( url ){
        url = url + '?systemTestSupport=true';
        browser.get(url);
        browser.sleep(3000);
    });
};

exports.acceptAlert = function(){
    browser.sleep(1000);
    if(browser.browserName === 'chrome'){
        browser.switchTo().alert().accept();
    }
    else if(browser.browserName === 'phantomjs'){
        browser.executeScript('window.confirm = function() {return true;}');
    }
};