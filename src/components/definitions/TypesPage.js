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
    return element.all(by.repeater('property in data track')).count();
};

exports.renameProperty = function(newName){
    browser.actions().mouseMove(element.all(by.model('property.key')).get(1)).perform();
    element.all(by.model('property.key')).get(1).clear().sendKeys(newName);
    return browser.actions().mouseMove({x: 400, y: 0}).perform();
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

exports.renameInterface = function(newName){
    element.all(by.css('.block-table-title')).get(0).click();
    element.all(by.model('interface.key')).get(1).clear().sendKeys(newName);
    return browser.actions().mouseMove({x: 400, y: 0}).perform();
};

exports.saveNewInterface = function(number){
    if(!number){number = 0;}
    return $$('[ng-click="addInterface()"]').get(number).click();
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

exports.renameOperation = function(newName){
    browser.actions().mouseMove(element.all(by.model('item.operation')).get(1)).perform();
    element.all(by.model('item.operation')).get(1).clear().sendKeys(newName);
    return browser.actions().mouseMove({x: 400, y: 0}).perform();
};

exports.removeInterfaceOperation = function(){
    return $$('[ng-click="deleteInterfaceOperation($index, interface, $event)"]').get(0).click();
};

exports.addNewInterfaceOperation = function(){
    return $$('[ng-click="addInterfaceOperation(interface)"]').get(0).click();
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

exports.renameInput = function(){
    element.all(by.cssContainingText('.select-input-height', 'New_Input_1')).click();
    element.all(by.model('option.name')).get(0).clear().sendKeys('New_Input_2');
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
    return $('#configInlineTypeDialog .dropdown-toggle').click();
};

exports.selectNewInlineDerivedFrom = function(derivedFrom){
    return  element(by.cssContainingText('.dropdown-menu a', derivedFrom)).click();
};

exports.selectNewRelationshipDerivedFrom = function(derivedFrom){
    return  element(by.cssContainingText('.dropdown-menu a', derivedFrom)).click();
};

exports.selectedDerivedFrom = function(){
    return element.all(by.css('.derived-from-form .tt-input')).get(0).getAttribute('value');
};
