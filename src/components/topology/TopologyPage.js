'use strict';


/**
 *
 * functions used in Topology
 *
 **/

exports.dragAndDrop = function(dragItem, dragDest){
  dragItem.click();
  browser.actions().dragAndDrop(dragItem, dragDest).perform();
};

exports.openNode = function(){
  return element(by.css('.nodeContainer')).click();
};

exports.setPropertyValue = function(){
  return element.all(by.css('.propsContainer .tt-input')).get(0).sendKeys('{ "get_input" : "name"}');
};

exports.getPropertyValue = function(){
  return element.all(by.css('.propsContainer .tt-input')).get(0).getAttribute('value');
};

exports.searchElementInRepeat = function(el, repeat){
  return el.all(by.repeater(repeat)).filter(function(result){
    return result;
  });
};

exports.saveBlueprint = function(){
  return $('[ng-click="saveOrUpdateBlueprint()"]').click();
};


