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

exports.setInput = function(name, description, defaultField){

  element(by.css('.blueprint-inputs')).all(by.model('field.name')).get(0).sendKeys(name);

  element(by.css('.blueprint-inputs')).all(by.model('field.description')).get(0).sendKeys(description);

  element(by.css('.blueprint-inputs')).all(by.model('field.default')).get(0).sendKeys(defaultField);

};
exports.setOutput = function(name, description, value){

  element(by.css('.blueprint-outputs')).all(by.model('field.name')).get(0).sendKeys(name);

  element(by.css('.blueprint-outputs')).all(by.model('field.description')).get(0).sendKeys(description);

  element(by.css('.blueprint-outputs')).all(by.model('field.value')).get(0).sendKeys(value);

};

exports.renameOutputValue = function(el){
   el.all(by.repeater('(key,field) in data')).then(function(result){
     result[0].element(by.css('.tt-input')).clear().sendKeys('name');
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



