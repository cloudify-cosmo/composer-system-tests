'use strict';

// opens 'the add new plugin' modal

/**
 *
 * functions used in inputsOutputs
 *
 **/

exports.submitInputOrOutput = function(el){
  return el.$('[ng-click="addField()"]').click();
};
exports.deleteInputOrOutput = function(el){
  return el.$('[ng-click="checkRemoveField(key,field)"]').click();
};

exports.setInputOrOutputFields = function(el, type){

  var nameField = el.all(by.model('field.name')).get(0);
  nameField.sendKeys('name');

  var descriptionField = el.all(by.model('field.description')).get(0);
  descriptionField.sendKeys('description');

  if(type === 'input'){
    var defaultField = el.all(by.model('field.default')).get(0);
    defaultField.sendKeys('default');
  }else{
    var valueField = el.all(by.css('.tt-input')).get(0);
    valueField.sendKeys('value');
  }

};

exports.renameOutputValue = function(el){
   el.all(by.repeater('(key,field) in data')).then(function(result){
     result[0].element(by.css('.tt-input')).clear().sendKeys('name')
  });
};

exports.getOutputValue = function(el){
   return el.all(by.repeater('(key,field) in data')).then(function(result){
     return result[0].element(by.css('.tt-input')).getAttribute('value');
  });
};

exports.countInputsOrOutputs = function(el){
  return el.all(by.repeater('(key,field) in data')).count();
};

exports.isElementDisplayed = function(el){
  return el.isDisplayed().then(function(result) {
    return result
  });
};
exports.isElementPresent = function(el){
  return el.isPresent().then(function(result) {
    return result
  });
};

exports.popoverDeleteConfirm = function(el, status){
  if(status === 'yes'){
    return el.element(by.css('.okBtn')).click();
  }  else{
    return el.element(by.css('.cancelBtn')).click();
  }
};

//exports.getPluginSource = function(){
//
//    $$('.display-name').filter((elem, index)=>{
//        return elem.getText().then((text)=>{
//            return text === 'Source';
//        })
//    });
//
//};
//
//exports.getOverrideMsg = function(){
//    return $$('.invalid').getText().then((text) =>{
//        // console.log(text[2]);
//        return text[2];
//    });
//};
//
//
//exports.override = function(){
//    return $('[ng-click="overridePlugin($files)"]').click();
//};

