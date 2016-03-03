'use strict';

// opens 'the add new plugin' modal

/**
 *
 * functions used in definitions --> plugins section
 *
 **/

exports.openUploadPluginDialog = function(){

    $$('.display-name').filter((elem)=>{
        return elem.getText().then((text)=>{
            return text === 'New plugin';
        });
    }).click();

};

exports.getPluginName = function(){

    $$('.definition-block').filter((elem)=>{
        return elem.getText().then((text)=>{
            console.log('plugin name is: ' + text);
            return text === 'Name';
        });
    }).then(function(filteredElements) {
        console.log('plugin name is: ' +  filteredElements[0]);

    });

};

exports.getPluginSource = function(){

    $$('.display-name').filter((elem)=>{
        return elem.getText().then((text)=>{
            return text === 'Source';
        });
    });

};

exports.getOverrideMsg = function(){
    return $$('.invalid').getText().then((text) =>{
        // console.log(text[2]);
        return text[2];
    });
};


exports.override = function(){
    return $('[ng-click="overridePlugin($files)"]').click();
};

exports.addNewTypeElement = function(){
    return element.all(by.css('.add-block')).get(0).click();
};

exports.addPropertyElement = function(){
    return element(by.css('.properties-block')).all(by.css('.add-block')).get(0).click();
};

exports.showHiddenInputs = function(){
    return element(by.css('.properties-block')).all(by.css('.item-block')).get(0).click();
};

exports.setInlineTypeName = function(){
    return element(by.model('configData.type')).sendKeys('name');
};

exports.setDefaultValue = function(){
    return  element.all(by.model('property.default')).get(1).clear().sendKeys('{ "get_input" : "name"}');
};

exports.saveInlineTypeElement = function(){
    return element(by.css('.btn-primary')).click();
};

exports.clickEditButton = function(){
    return element(by.css('.icon-edit')).click();
};

exports.getPropertyDescription = function(){
    return element(by.css('.properties-block')).element(by.css('.tt-input')).getAttribute('value');
};


exports.clickEnterBtn = function(){
    browser.sleep(400);
    return browser.actions().sendKeys(protractor.Key.ENTER).perform();
};

exports.pushNewTypeBtn = function(){
    return element(by.cssContainingText('.display-name', 'New type')).click();
};

exports.pushNewRelationshipBtn = function(){
    return element(by.cssContainingText('.display-name', 'New relationship')).click();
};

exports.pushEditInlineTypeBtn = function(){
    return element.all(by.css('.icon-edit')).get(0).click();
};

exports.countInlineTypes = function(){
  return element.all(by.repeater('inlineType in globals.definitions.inlineTypes')).count();
};

exports.countRelationships = function(){
  return element.all(by.repeater('relationship in globals.definitions.relationships')).count();
};

exports.deleteInlineTypes = function(){
    element.all(by.repeater('inlineType in globals.definitions.inlineTypes')).get(0).all(by.css('.icon-delete')).get(0).click();
    browser.sleep(200);
    element(by.css('.popover .okBtn')).click();
};

exports.deleteRelationshipTypes = function(){
    element.all(by.repeater('relationship in globals.definitions.relationships')).get(0).all(by.css('.icon-delete')).get(0).click();
    browser.sleep(200);
    element(by.css('.popover .okBtn')).click();
};

exports.clickDeleteRelationshipBtn = function(){
    element.all(by.repeater('relationship in globals.definitions.relationships')).get(0).all(by.css('.icon-delete')).get(0).click();
};

exports.clickDeleteInlineTypesBtn = function(){
    element.all(by.repeater('inlineType in globals.definitions.inlineTypes')).get(0).all(by.css('.icon-delete')).get(0).click();
};
