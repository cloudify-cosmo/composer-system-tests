'use strict';

exports.getStencil = function getStencil(name) {

  return element.all(by.css('.stencilContainer .name')).filter(function(elem) {
    return elem.getText().then(function(text) {
      return text === name;
    });
  }).first();
};