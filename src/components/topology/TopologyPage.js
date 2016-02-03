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


exports.searchElementInRepeat = function(el, repeat){
  return el.all(by.repeater(repeat)).filter(function(result){
    return result
  });
};


