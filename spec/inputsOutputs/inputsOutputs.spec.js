'use strict';
var components = require('../../src/components');

var inputElement = element(by.css('.blueprint-inputs'));
var outputElement = element(by.css('.blueprint-outputs'));

describe('inputsOutputs page', function() {

  describe('login',function() {
    browser.get('/');

    components.login.login('user-' + new Date().getTime());
    // navigate to inputs outputs tab
    browser.sleep(2000);
    components.layout.goToInputsOutputs();
  });

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
      browser.sleep(200).then(done);

    });

    it('should fill fields and add output', function(done) {
      //fill output fields and add it

      components.inputsOutputs.page.setInputOrOutputFields(outputElement, 'output');//fill fields
      components.inputsOutputs.page.submitInputOrOutput(outputElement);//submit
      browser.sleep(200).then(done);

    });

    it('should not add inputs with the same name', function(done) {
      //check that we can't add output if name exist

      components.inputsOutputs.page.setInputOrOutputFields(inputElement, 'input');//fill fields
      components.inputsOutputs.page.submitInputOrOutput(inputElement);//add
      expect(components.inputsOutputs.page.countInputsOrOutputs(inputElement)).toBe(1);//new field should not be added
      browser.sleep(200).then(done);

    });

    it('should not add outputs with the same name', function(done) {
      //check that we can't add output if name exist

      components.inputsOutputs.page.setInputOrOutputFields(outputElement, 'output');//fill fields
      components.inputsOutputs.page.submitInputOrOutput(outputElement);//add
      expect(components.inputsOutputs.page.countInputsOrOutputs(outputElement)).toBe(1);//new field should not be added
      browser.refresh();
      browser.sleep(200).then(done);

    });
  });

  describe('remove input and output', function() {

    it('should remove input', function(done) {
      // remove input
      components.inputsOutputs.page.setInputOrOutputFields(inputElement, 'input');//fill fields
      components.inputsOutputs.page.submitInputOrOutput(inputElement);//add
      components.inputsOutputs.page.deleteInputOrOutput(inputElement, 'input');//remove element
      expect((element(by.css('.popover')).isDisplayed())).toBeTruthy();//popover should show up

      components.popovers.popover.clickYes();//click no btn
      expect(components.inputsOutputs.page.countInputsOrOutputs(inputElement)).toBe(0);//should be removed
      browser.sleep(200).then(done);

    });

    it('should remove output', function(done) {
      // remove output
      components.inputsOutputs.page.setInputOrOutputFields(outputElement, 'output');//fill fields
      components.inputsOutputs.page.submitInputOrOutput(outputElement); //add
      components.inputsOutputs.page.deleteInputOrOutput(outputElement, 'output');//remove element
      expect((element(by.css('.popover')).isDisplayed())).toBeTruthy();//popover should show up

      components.popovers.popover.clickYes();//click no btn
      expect(components.inputsOutputs.page.countInputsOrOutputs(outputElement)).toBe(0);//should be removed
      browser.sleep(200).then(done);

    });
  });

  describe('remove input and output and validate node property and inlineTypes property', function() {

    it('should set input name in outputs value, node property and inlineTypes property field', function(done) {

      components.inputsOutputs.page.setInputOrOutputFields(inputElement, 'input');//fill fields
      components.inputsOutputs.page.setInputOrOutputFields(outputElement, 'output');//fill fields
      components.inputsOutputs.page.submitInputOrOutput(inputElement);//add
      components.inputsOutputs.page.submitInputOrOutput(outputElement); //add
      components.inputsOutputs.page.renameOutputValue(outputElement);// change the output value as at input name

      components.layout.goToTopology();


      var dragItem = element.all(by.css('.stencilContainer')).get(0);
      var dragDest = element(by.id('topologyContainer'));

      components.layout.dragAndDrop(dragItem, dragDest);
      components.topology.page.openNode();
      components.topology.page.setPropertyValue('{"get_input":"name"}');

      browser.sleep(200);

      components.layout.goToDefinitions();
      components.definitions.page.addNewTypeElement();//click new type button
      components.definitions.page.addPropertyElement();//add new property fields
      components.definitions.page.setInlineTypeName();//set inline type name

      components.definitions.page.showHiddenInputs();//click on field to show hidden inputs

      components.definitions.page.setDefaultValue();

      components.definitions.page.clickEnterBtn();
      components.definitions.page.saveInlineTypeElement();//save inline type

      browser.sleep(200).then(done);
    });

    it('should not remove input name in outputs value, node property and inlineTypes property field', function(done) {
      components.layout.goToInputsOutputs();

      components.inputsOutputs.page.deleteInputOrOutput(inputElement, 'input');// try to delete input
      expect((element(by.css('.popover')).isDisplayed())).toBeTruthy();//popover should show up

      components.popovers.popover.clickNo();//click no btn
      browser.sleep(200);
      expect(element(by.css('.popover')).isPresent()).toBe(false);
      expect(components.inputsOutputs.page.countInputsOrOutputs(inputElement)).toBe(1);//input should exist

      components.layout.goToTopology();

      components.topology.page.openNode();
      components.topology.page.setPropertyValue('{"get_input":"name"}');
      expect(element.all(by.css('.propertiesContainer .propItem .propData')).get(0).getAttribute('value')).toBe('{"get_input":"name"}');//text should exist

      components.layout.goToDefinitions();

      components.definitions.page.clickEditButton();//click edit button
      components.definitions.page.showHiddenInputs();//click on field to show hidden inputs
      expect(components.definitions.page.getPropertyDescription()).toBe('{ "get_input" : "name"}');//text should exist

      browser.sleep(200).then(done);
    });

    it('should remove input name in outputs value node property and inlineTypes property field', function(done) {

      components.layout.goToInputsOutputs();

      components.inputsOutputs.page.deleteInputOrOutput(inputElement, 'input');// try to delete input
      expect((element(by.css('.popover')).isDisplayed())).toBeTruthy();//popover should show up

      components.popovers.popover.clickYes();//push 'Yes' btn
      expect(components.inputsOutputs.page.countInputsOrOutputs(inputElement)).toBe(0);//input should be removed
      expect(components.inputsOutputs.page.countInputsOrOutputs(outputElement)).toBe(1);//output should exist
      expect(components.inputsOutputs.page.getOutputValue(outputElement)).toBe('');//output value field should be empty
      components.inputsOutputs.page.deleteInputOrOutput(outputElement, 'output');//remove element

      components.layout.goToTopology();
      components.topology.page.openNode();
      expect(components.topology.page.getPropertyValue()).toBe('');//text shouldn't exist

      components.layout.goToDefinitions();
      components.definitions.page.clickEditButton();//click edit button
      expect(components.definitions.page.getPropertyDescription()).toBe('');//text shouldn't exist

      browser.sleep(200).then(done);
    });
  });

  describe('save inputs and outputs', function() {
    it('should show input and output after save and page refresh', function(done){
      components.layout.goToInputsOutputs();

      components.inputsOutputs.page.setInputOrOutputFields(outputElement, 'output');//fill fields
      components.inputsOutputs.page.setInputOrOutputFields(inputElement, 'input');//fill fields
      components.inputsOutputs.page.submitInputOrOutput(outputElement);//submit
      components.inputsOutputs.page.submitInputOrOutput(inputElement);//submit

      components.layout.saveBlueprint();//click save blueprint button

      browser.refresh();
      expect(components.inputsOutputs.page.countInputsOrOutputs(outputElement)).toBe(1);//input should exist
      expect(components.inputsOutputs.page.countInputsOrOutputs(inputElement)).toBe(1);//output should exist

      browser.sleep(200).then(done);

    });
  });
});
