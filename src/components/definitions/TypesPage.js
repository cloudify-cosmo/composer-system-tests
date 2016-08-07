'use strict';

/**
 *
 * functions used in definitions --> inlineTypes and relationships section
 *
 **/

exports.saveType = function(){
    return $('[ng-click="save()"]').click();
};

exports.closeType = function(){
    return $('[ng-click="cancel()"]').click();
};

exports.setTypeName = function(name){
    return element(by.model('configData.type')).sendKeys(name);
};

exports.addNewProperty = function(){
    return element(by.cssContainingText('.add-block', 'Add Property')).click();
};

exports.countProperties = function(){
    return element.all(by.repeater('property in data track by $index')).count();
};

exports.clickProperty = function(number){
    if(!number){number = 0;}
    return element.all(by.repeater('property in data track by $index')).get(number).click();
};


exports.clickEnterBtn = function(){
    browser.sleep(400);
    return browser.actions().sendKeys(protractor.Key.ENTER).perform();
};

exports.clickEscBtn = function(){
    browser.sleep(400);
    return browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
};

exports.renameProperty = function(newName, type, number){
    return  element.all(by.model('property.'+type)).get(number).clear().sendKeys(newName);
};

exports.changePropertyType = function(newName, type, number){
    return  element.all(by.model('property.'+type)).get(number).clear().sendKeys(newName);
};

exports.deleteInlineTypeProperties = function(){
    return  $$('[ng-click="deleteProperty($index)"]').get(0).click();
};

exports.pushAddNewInterfaceBtn = function(number){
    if(!number){number = 0;}
    return  element.all(by.cssContainingText('.display-name', 'Interface')).get(number).click();
};

exports.renameAddNewInterface = function(newName){
    return element.all(by.model('interface.key')).get(0).clear().sendKeys(newName);
};

exports.clickInterface= function(number){
    if(!number){number = 0;}
    return element.all(by.repeater('interface in data track by $index')).get(number).all(by.css('.block-table-title')).get(0).click();
};

exports.renameInterface = function(newName, number){
    if(!number){number = 0;}
    element.all(by.model('interface.key')).get(number).clear().sendKeys(newName);
    return browser.actions().mouseMove({x: 400, y: 0}).perform();
};

exports.clickOperation= function(number){
    if(!number){number = 0;}
    return element.all(by.repeater('item in interface.data track by $index')).get(number).click();
};

exports.renameOperation = function(newName, type, number){
    return element.all(by.model('item.' + type)).get(number).clear().sendKeys(newName);
};

exports.saveNewInterface = function(number){
    if(!number){number = 0;}
    return $$('[ng-click="addInterface()"]').get(number).click();
};

exports.openSavedType = function(number){
    if(!number){number = 0;}
    return $$('[ng-click="openEditTypePage(inlineType, $index, list.type)"]').get(number).click();
};

exports.closeNewInterface = function(){
    return $$('[ng-click="deleteInterface()"]').get(0).click();
};

exports.countInterfaces = function(){
    return element.all(by.repeater('interface in data')).count();
};

exports.countInterfaceOperations = function(){
    var container = element.all(by.css('.interface-config-block')).get(0);
    return container.all(by.repeater('item in interface.data')).count();
};

exports.createInterfaceRenameOperation = function(newName){
    browser.actions().mouseMove(element.all(by.model('item.operation')).get(1)).perform();
    element.all(by.model('item.operation')).get(1).clear().sendKeys(newName);
    return browser.actions().mouseMove({x: 400, y: 0}).perform();
};

exports.removeInterfaceOperation = function(){
    return $$('[ng-click="deleteInterfaceOperation($index, interface, $event)"]').get(0).click();
};

exports.addNewInterfaceOperation = function(number){
    if(!number){number = 0;}
    return $$('[ng-click="addInterfaceOperation(interface)"]').get(number).click();
};

exports.deleteInterface = function(){
    return $$('[ng-click="deleteInterface($index)"]').get(0).click();
};

exports.openInputsBlock = function(){
    return $$('[ng-click="viewInterfaceOperation(item, $index)"]').get(0).click();
};

exports.closeInputBlock = function(){
    return $$('[ng-click="deleteInterfaceItemOption($event, item)"]').get(0).click();
};

exports.addInput = function(){
    return element(by.css('.icon-add.add-new-input')).click();
};

exports.clickInput = function(number){
    if(!number){number = 0;}
     return element.all(by.repeater('option in item.data track by $index')).get(number).click();
};

exports.renameInput = function(newName, type){
    element.all(by.model('option.'+ type)).get(0).clear().sendKeys(newName);
    browser.actions().mouseMove(element.all(by.model('option.' + type)).get(0)).perform();
    return browser.actions().mouseMove({x: 400, y: 0}).perform();
};

exports.countInputs = function(){
    return element.all(by.repeater('option in item.data')).count();
};

exports.saveInput = function(){
    return $$('[ng-click="addInterfaceItemOption()"]').get(0).click();
};

exports.removeInput = function(){
    return $('.item-block .icon-closed ').click();
};

exports.openDerivedFromDropdown = function(){
    return $$('#configInlineTypeDialog .dropdown-toggle').get(0).click();
};

exports.selectNewInlineDerivedFrom = function(derivedFrom){
    return  element(by.cssContainingText('.dropdown-menu a', derivedFrom)).click();
};

exports.selectNewRelationshipDerivedFrom = function(derivedFrom){
    return  element(by.cssContainingText('.dropdown-menu a', derivedFrom)).click();
};

exports.selectedDerivedFrom = function(){
    return element.all(by.css('.derived-from-form')).get(0).element(by.model('configData.data.derived_from')).getAttribute('value');
};
