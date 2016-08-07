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

exports.setInput = function(name, description, defaultField){

  element(by.css('.blueprint-inputs')).all(by.model('field.name')).get(0).clear().sendKeys(name);

  element(by.css('.blueprint-inputs')).all(by.model('field.description')).get(0).clear().sendKeys(description);

  element(by.css('.blueprint-inputs')).all(by.model('field.default')).get(0).clear().sendKeys(defaultField);

};
exports.setOutput = function(name, description, value){

  element(by.css('.blueprint-outputs')).all(by.model('field.name')).get(0).clear().sendKeys(name);

  element(by.css('.blueprint-outputs')).all(by.model('field.description')).get(0).clear().sendKeys(description);

  element(by.css('.blueprint-outputs')).all(by.model('field.value')).get(0).clear().sendKeys(value);

};

exports.renameOutputValue = function(el){
   el.all(by.repeater('(key,field) in data')).then(function(result){
     result[0].element(by.model('field.value')).clear().sendKeys('name');
  });
};

exports.getOutputValue = function(el){
   return el.all(by.repeater('(key,field) in data')).then(function(result){
     return result[0].element(by.model('field.value')).getAttribute('value');
  });
};

exports.countInputsOrOutputs = function(el){
  return el.all(by.repeater('(key,field) in data')).count();
};



