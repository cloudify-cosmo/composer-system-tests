/**
 * Created by liron on 1/21/16.
 */
'use strict';

// opens 'the add new plugin' modal

/**
 *
 * functions used in definitions --> plugins section
 *
 **/

exports.openUploadPluginDialog = function(){

    $$('.display-name').filter((elem, index)=>{
        return elem.getText().then((text)=>{
            return text === 'New plugin';
        })
    }).click();

};

exports.getPluginName = function(){

    $$('.definition-block').filter((elem, index)=>{
        return elem.getText().then((text)=>{
            console.log('plugin name is: ' + text);
            return text === 'Name';
        })
    }).then(function(filteredElements) {
        console.log('plugin name is: ' +  filteredElements[0]);

    });

};

exports.getPluginSource = function(){

    $$('.display-name').filter((elem, index)=>{
        return elem.getText().then((text)=>{
            return text === 'Source';
        })
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

exports.setDescriptionValue = function(){
    return element(by.css('.properties-block')).element(by.css('.tt-input')).sendKeys('{ "get_input" : "name"}');
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

