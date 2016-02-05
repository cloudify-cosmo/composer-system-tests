'use strict';
var fs = require('fs-extra');
var logger = require('log4js').getLogger('Resources-e2e');
var _ = require('lodash');
var components = require('../../src/components');

describe('inputsOutputs page', function() {

  describe('login',function() {
    browser.get('/');

    components.login.login('user-' + new Date().getTime());
    // navigate to inputs outputs tab
    browser.sleep(2000);
    components.layout.goToInputsOutputs();
  });

  var inputElement = element(by.css('.blueprint-inputs'));
  var outputElement = element(by.css('.blueprint-outputs'));

  var saveInlineTypeElement = element(by.css('.btn-primary'));
  var addNewTypeElement = element.all(by.css('.add-block')).get(0);
  var addPropertyElement = element(by.css('.properties-block')).all(by.css('.add-block')).get(0);
  var propertyItemElement = element(by.css('.properties-block')).all(by.css('.item-block')).get(0);
  var typeNameElement = element(by.model('configData.type'));
  var propertyDescriptionElement = element(by.css('.properties-block')).element(by.css('.tt-input'));

  var dragItem = element.all(by.css('.stencilContainer')).get(0);
  var dragDest = element(by.id('topologyContainer'));
  var nodeElement = components.topology.page.searchElementInRepeat(element(by.id('propertiesData')), '(prop, propValue) in data.selectedNode.infoData.properties');

  describe('add input and output', function() {

    it('should not add input with empty name', function(done) {

      components.inputsOutputs.page.submitInputOrOutput(inputElement);//submit
      expect(components.inputsOutputs.page.countInputsOrOutputs(inputElement)).toBe(0);//new field should not be added
      browser.sleep(200).then(done);

    });

    it('should not add input with empty name', function(done) {

      components.inputsOutputs.page.submitInputOrOutput(outputElement);//submit
      expect(components.inputsOutputs.page.countInputsOrOutputs(outputElement)).toBe(0);//new field should not be added
      browser.sleep(200).then(done);

    });

    it('should fill fields and add input', function(done) {
      //fill input fields and add it

      components.inputsOutputs.page.setInputOrOutputFields(inputElement, 'input');//fill fields
      components.inputsOutputs.page.submitInputOrOutput(inputElement);//submit
      browser.sleep(1000).then(done);

    });

    it('should fill fields and add output', function(done) {
      //fill output fields and add it

      components.inputsOutputs.page.setInputOrOutputFields(outputElement, 'output');//fill fields
      components.inputsOutputs.page.submitInputOrOutput(outputElement);//submit
      browser.sleep(1000).then(done);

    });

    it('should not add inputs with the same name', function(done) {
      //check that we can't add output if name exist

      components.inputsOutputs.page.setInputOrOutputFields(inputElement, 'input');//fill fields
      components.inputsOutputs.page.submitInputOrOutput(inputElement);//add
      expect(components.inputsOutputs.page.countInputsOrOutputs(inputElement)).toBe(1);//new field should not be added
      browser.sleep(1000).then(done);

    });

    it('should not add outputs with the same name', function(done) {
      //check that we can't add output if name exist

      components.inputsOutputs.page.setInputOrOutputFields(outputElement, 'output');//fill fields
      components.inputsOutputs.page.submitInputOrOutput(outputElement);//add
      expect(components.inputsOutputs.page.countInputsOrOutputs(outputElement)).toBe(1);//new field should not be added
      browser.refresh();
      browser.sleep(1000).then(done);

    });
  });
  describe('remove input and output', function() {

    it('should remove input', function(done) {
      // remove input
      components.inputsOutputs.page.setInputOrOutputFields(inputElement, 'input');//fill fields
      components.inputsOutputs.page.submitInputOrOutput(inputElement);//add
      components.inputsOutputs.page.deleteInputOrOutput(inputElement, 'input');//remove element
      expect(components.inputsOutputs.page.countInputsOrOutputs(inputElement)).toBe(0);//should be removed
      browser.sleep(1000).then(done);

    });

    it('should remove output', function(done) {
      // remove output
      components.inputsOutputs.page.setInputOrOutputFields(outputElement, 'output');//fill fields
      components.inputsOutputs.page.submitInputOrOutput(outputElement); //add
      components.inputsOutputs.page.deleteInputOrOutput(outputElement, 'output');//remove element
      expect(components.inputsOutputs.page.countInputsOrOutputs(outputElement)).toBe(0);//should be removed
      browser.sleep(1000).then(done);

    });

    it('should set input name in outputs value, node property and inlineTypes property field', function(done) {

      components.inputsOutputs.page.setInputOrOutputFields(inputElement, 'input');//fill fields
      components.inputsOutputs.page.setInputOrOutputFields(outputElement, 'output');//fill fields
      components.inputsOutputs.page.submitInputOrOutput(inputElement);//add
      components.inputsOutputs.page.submitInputOrOutput(outputElement); //add
      components.inputsOutputs.page.renameOutputValue(outputElement);// change the output value as at input name

      components.layout.goToTopology();
      components.topology.page.dragAndDrop(dragItem, dragDest);
      components.layout.clickElement(element(by.css('.nodeContainer')));
      nodeElement.get(0).element(by.css('.tt-input')).sendKeys('{ "get_input" : "name"}');

      browser.sleep(200);

      components.layout.goToDefinitions();
      components.layout.clickElement(addNewTypeElement);//click new type button
      components.layout.clickElement(addPropertyElement);//add new property fields

      typeNameElement.sendKeys('name');//set inline type name
      components.layout.clickElement(propertyItemElement);//click on field to show hidden inputs

      propertyDescriptionElement.sendKeys('{ "get_input" : "name"}');// set description value
      components.layout.clickElement(saveInlineTypeElement);//save inline type

      browser.sleep(1000).then(done);
    });

    it('should not remove input name in outputs value, node property and inlineTypes property field', function(done) {
      components.layout.goToInputsOutputs();

      components.inputsOutputs.page.deleteInputOrOutput(inputElement, 'input');// try to delete input
      expect(components.inputsOutputs.page.isElementDisplayed(element(by.css('.popover')))).toBe(true);//popover should show up

      components.inputsOutputs.page.popoverDeleteConfirm(inputElement, 'no');//push 'No' btn
      expect(components.inputsOutputs.page.isElementDisplayed(element(by.css('.popover')))).toBe(false);//popover should hide
      expect(components.inputsOutputs.page.countInputsOrOutputs(inputElement)).toBe(1);//input should exist

      components.layout.goToTopology();
      components.layout.clickElement(element(by.css('.nodeContainer')));
      expect(nodeElement.get(0).element(by.css('.tt-input')).getAttribute('value')).toBe('{ "get_input" : "name"}');//text should exist

      browser.sleep(200);

      components.layout.goToDefinitions();
      components.layout.clickElement(element(by.css('.icon-edit')));//click edit button
      expect(propertyDescriptionElement.getAttribute('value')).toBe('{ "get_input" : "name"}');//text should exist

      browser.sleep(1000).then(done);
    });

    it('should remove input name in outputs value node property and inlineTypes property field', function(done) {

      components.layout.goToInputsOutputs();

      components.inputsOutputs.page.deleteInputOrOutput(inputElement, 'input');// try to delete input
      expect(components.inputsOutputs.page.isElementDisplayed(element(by.css('.popover')))).toBe(true);//popover should show up

      components.inputsOutputs.page.popoverDeleteConfirm(inputElement, 'yes');//push 'Yes' btn
      expect(components.inputsOutputs.page.isElementPresent(element(by.css('.popover')))).toBe(false);//popover should be deleted
      expect(components.inputsOutputs.page.countInputsOrOutputs(inputElement)).toBe(0);//input should be removed
      expect(components.inputsOutputs.page.countInputsOrOutputs(outputElement)).toBe(1);//output should exist
      expect(components.inputsOutputs.page.getOutputValue(outputElement)).toBe('');//output value field should be empty
      components.inputsOutputs.page.deleteInputOrOutput(outputElement, 'output');//remove element

      components.layout.goToTopology();
      components.layout.clickElement(element(by.css('.nodeContainer')));
      expect(nodeElement.get(0).element(by.css('.tt-input')).getAttribute('value')).toBe('');//text shouldn't exist

      components.layout.goToDefinitions();
      components.layout.clickElement(element(by.css('.icon-edit'))); //click edit button
      expect(propertyDescriptionElement.getAttribute('value')).toBe('');//text shouldn't exist

      browser.sleep(1000).then(done);
    });
  });

  describe('save inputs and outputs', function() {
     it('should show input and output after save and page refresh', function(done){
       components.layout.goToInputsOutputs();

       components.inputsOutputs.page.setInputOrOutputFields(outputElement, 'output');//fill fields
       components.inputsOutputs.page.setInputOrOutputFields(inputElement, 'input');//fill fields
       components.inputsOutputs.page.submitInputOrOutput(outputElement);//submit
       components.inputsOutputs.page.submitInputOrOutput(inputElement);//submit

       components.layout.clickElement($('[ng-click="saveOrUpdateBlueprint()"]')); //click save blueprint button
       browser.sleep(500).then(done);

       browser.refresh();
       expect(components.inputsOutputs.page.countInputsOrOutputs(outputElement)).toBe(1);//input should exist
       expect(components.inputsOutputs.page.countInputsOrOutputs(inputElement)).toBe(1);//output should exist

       browser.sleep(1000).then(done);

     })
  });
});
