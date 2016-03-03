'use strict';
var fs = require('fs-extra');
var logger = require('log4js').getLogger('Plugins-e2e');
var _ = require('lodash');
var components = require('../../src/components');

describe('inlineTypes section', function() {
    describe('login',function() {
        browser.get('/');

        components.login.login('user-' + new Date().getTime());
        // navigate to definitions tab
        browser.sleep(2000);
        components.layout.goToDefinitions();
    });
    describe('add/remove inlineTypes', function() {

        it('should not add inlineTypes with empty name', function(done) {
            components.definitions.page.pushNewTypeBtn();//open inlineType view
            components.definitions.types.saveType();//save inlineType view

            expect(components.layout.isElementDisplayed(element(by.cssContainingText('.definition-title-edit-error', 'Name is empty. Please select a name.')))).toBe(true);
            browser.sleep(200).then(done);

        });
        it('should add inlineTypes name and save it', function(done) {
            components.definitions.types.setTypeName('name');//set inlineType name
            components.definitions.types.saveType();//save inlineType view

            expect(components.definitions.page.countInlineTypes()).toBe(1);
            browser.sleep(200).then(done);

        });

        it('should not add inlineTypes if name exist', function(done) {
            components.definitions.page.pushNewTypeBtn();//open inlineType view
            components.definitions.types.setTypeName('name');//set inlineType name

            expect(components.layout.isElementDisplayed(element(by.cssContainingText('.definition-title-edit-error', 'Name already in use. Please select a different name.')))).toBe(true);
            components.definitions.types.closeType();//push cancel button
            browser.sleep(200).then(done);
        });

        it('should delete inlineType', function(done) {
            components.definitions.page.deleteInlineTypes();//delete inlineType

            expect(components.definitions.page.countInlineTypes()).toBe(0);
            browser.sleep(200).then(done);
        });

    });
    describe('inlineTypes properties', function() {

        it('should add new inlineType property', function(done) {
            components.definitions.page.pushNewTypeBtn();//open inlineType view
            components.definitions.types.setTypeName('name');//set inlineType name
            components.definitions.types.addNewProperty();//set new inlineType property

            expect(components.definitions.types.countProperties()).toBe(1);

            browser.sleep(200).then(done);

        });

        it('should save properties', function(done) {
            components.definitions.types.saveType();//save inlineType view
            components.definitions.page.pushEditInlineTypeBtn();//edit inlineType view

            expect(components.definitions.types.countProperties()).toBe(1);

            browser.sleep(200).then(done);
        });

        it('should not save properties with the same names', function(done) {
            components.definitions.types.addNewProperty();//set new inlineType property
            expect(components.definitions.types.countProperties()).toBe(2);

            components.definitions.types.renameProperty('New_property_1');//rename inlineType property

            expect(components.layout.isElementDisplayed(element.all(by.cssContainingText('.nameEditError', 'Property name already in use. Please select a different name.')).get(0))).toBe(true);//error msg should appears

            expect(element(by.cssContainingText('.btn-primary', 'Save')).getAttribute('disabled')).toBe('true');//save btn should be disabled

            browser.sleep(200).then(done);
        });



        it('should delete properties', function(done) {
            components.definitions.types.deleteInlineTypeProperties();//save inlineType view
            expect(components.definitions.types.countProperties()).toBe(1);

            components.definitions.types.closeType();//push cancel button
            components.definitions.page.deleteInlineTypes();//delete inlineType
            browser.sleep(200).then(done);
        });
    });
    describe('inlineTypes interfaces and operations', function() {

        it('should add new inlineType interface', function(done) {

            components.definitions.page.pushNewTypeBtn();//open inlineType view
            expect(components.definitions.types.countInterfaces()).toBe(3);//default interfaces equal 3

            components.definitions.types.pushAddNewInterfaceBtn();//push Add New Interface Btn
            expect(components.layout.isElementDisplayed(element.all(by.css('.interfaces-block .add-block')).get(0))).toBe(true);

            components.definitions.types.saveNewInterface();//save new inlineType interface
            expect(components.definitions.types.countInterfaces()).toBe(4);//count interfaces

            browser.sleep(200).then(done);

        });

        it('should not add new inlineType interface if interface name already exist', function(done) {

            components.definitions.types.pushAddNewInterfaceBtn();//push Add New Interface Btn

            components.definitions.types.renameAddNewInterface('New_interface_4');//rename inlineType Interface

            expect(components.layout.isElementDisplayed(element(by.cssContainingText('.interface-config-footer span', 'Add Interface')))).toBe(false);
            components.definitions.types.closeNewInterface();//not save new inlineType interface
            browser.sleep(200).then(done);

        });

        it('should add operation when create interface', function(done) {

            components.definitions.types.pushAddNewInterfaceBtn();//push add new interface Btn
            expect(components.layout.isElementDisplayed(element.all(by.css('.interfaces-block .add-block')).get(0))).toBe(true);

            expect(components.definitions.types.countInterfaceOperations()).toBe(1);

            components.definitions.types.addNewInterfaceOperation();//add new interface operation
            expect(components.definitions.types.countInterfaceOperations()).toBe(2);//after added new operation

            components.definitions.types.closeNewInterface();//not save new inlineType interface
            expect(components.definitions.types.countInterfaces()).toBe(4);//should not add new interface

            browser.sleep(200).then(done);

        });

        it('should not add new inlineType interface if operation name already exist', function(done) {

            components.definitions.types.pushAddNewInterfaceBtn();//push add new interface Btn

            components.definitions.types.addNewInterfaceOperation();//add new interface operation

            components.definitions.types.renameOperation('New_Operation_1');//rename inlineType interface operation

            expect(components.layout.isElementDisplayed(element.all(by.cssContainingText('.nameEditError', 'Operation name already in use. Please select a different name.')).get(0))).toBe(true);//error msg should appears
            expect(components.layout.isElementDisplayed(element(by.cssContainingText('.interface-config-footer span', 'Add Interface')))).toBe(false);//Add Interface btn should be hide
            expect(element(by.cssContainingText('.btn-primary', 'Save')).getAttribute('disabled')).toBe('true');//save btn should be disabled

            components.definitions.types.closeNewInterface();//not save new inlineType interface
            expect(components.definitions.types.countInterfaces()).toBe(4);//should not add new interface

            browser.sleep(200).then(done);

        });

        it('should remove operation when creating interface', function(done) {

            components.definitions.types.pushAddNewInterfaceBtn();//push add new interface Btn
            components.definitions.types.addNewInterfaceOperation();//add new interface operation
            components.definitions.types.removeInterfaceOperation();//remove operation

            expect(components.definitions.types.countInterfaceOperations()).toBe(1);//after removed new operation

            components.definitions.types.closeNewInterface();//not save new inlineType interface
            expect(components.definitions.types.countInterfaces()).toBe(4);//should not add new interface

            browser.sleep(200).then(done);

        });

        it('should delete custom interface', function(done) {

            expect(components.definitions.types.countInterfaces()).toBe(4);//count interfaces

            components.definitions.types.deleteInterface();//deleted custom interface
            expect(components.definitions.types.countInterfaces()).toBe(3);//after deleted custom interface

            components.definitions.types.closeType();//push cancel button
            browser.sleep(200).then(done);

        });

        it('should not save type if interface name exist', function(done) {

            components.definitions.page.pushNewTypeBtn();//push add new interface Btn

            components.definitions.types.pushAddNewInterfaceBtn();//push Add New Interface Btn
            components.definitions.types.saveNewInterface();//save new inlineType interface

            components.definitions.types.pushAddNewInterfaceBtn();//push Add New Interface Btn
            components.definitions.types.saveNewInterface();//save new inlineType interface

            components.definitions.types.renameInterface('New_interface_4');//rename Interface
            expect(components.layout.isElementDisplayed(element.all(by.cssContainingText('.nameEditError', 'Interface name already in use. Please select a different name.')).get(1))).toBe(true);//interface name error msg should appears
            expect(element(by.cssContainingText('.btn-primary', 'Save')).getAttribute('disabled')).toBe('true');//save btn should be disabled

            components.definitions.types.closeType();//push cancel button
            browser.sleep(200).then(done);

        });

    });
    describe('inlineTypes inputs', function() {
        it('should add new inlineType input', function(done) {
            components.definitions.page.pushNewTypeBtn();//open inlineType view
            components.definitions.types.pushAddNewInterfaceBtn();//push Add New Interface Btn
            components.definitions.types.saveNewInterface();//save new inlineType interface

            components.definitions.types.openInputsBlock();//open inputs block
            expect(components.layout.isElementDisplayed($$('[ng-show="isInterfaceOperationOpen && item == selectedItem"]').get(0))).toBe(true);//inputs block is appeared

            components.definitions.types.addInput();//add custom input
            expect(components.definitions.types.countInputs()).toBe(1);//count inputs after new input was added

            components.definitions.types.saveInput();//save custom input
            browser.sleep(200).then(done);

        });
        it('should remove inlineType input', function(done) {

            components.definitions.types.openInputsBlock();//open inputs block
            expect(components.definitions.types.countInputs()).toBe(1);//count inputs

            components.definitions.types.removeInput();//remove custom input
            expect(components.definitions.types.countInputs()).toBe(0);//count inputs after new input was removed
            components.definitions.types.saveInput();//save custom input

            browser.sleep(200).then(done);

        });
        it('should not save new inlineType input if name already exist', function(done) {

            components.definitions.types.openInputsBlock();//open inputs block
            components.definitions.types.addInput();//add custom input
            components.definitions.types.saveInput();//save custom input
            components.definitions.types.openInputsBlock();//open inputs block
            components.definitions.types.addInput();//add custom input

            components.definitions.types.renameInput();//rename custom input
            expect(components.layout.isElementDisplayed(element.all(by.cssContainingText('.nameEditError', 'Input name already in use. Please select a different name.')).get(0))).toBe(true);//error msg should appears
            expect(components.layout.isElementDisplayed(element.all(by.cssContainingText('.interface-config-footer span', 'Save Changes')).get(0))).toBe(false); //save btn should be hide
            expect(element(by.cssContainingText('.btn-primary', 'Save')).getAttribute('disabled')).toBe('true'); //save btn should be disabled

            components.definitions.types.closeInputBlock();//doesn't save custom input

            browser.sleep(200).then(done);

        });

        it('should not save new inlineType input', function(done) {

            components.definitions.types.openInputsBlock();//open inputs block
            expect(components.definitions.types.countInputs()).toBe(1);//count inputs

            components.definitions.types.addInput();//add custom input
            components.definitions.types.closeInputBlock();//close input block without save

            components.definitions.types.openInputsBlock();//open inputs block
            expect(components.definitions.types.countInputs()).toBe(1);//count inputs
            components.definitions.types.closeInputBlock();//close input block without save
            components.definitions.types.closeType();//push cancel button
            browser.sleep(200).then(done);

        });
    });
    describe('inlineTypes derived from', function() {
        it('should change derived from', function(done) {
            components.definitions.page.pushNewTypeBtn();//open inlineType view
            components.definitions.types.openDerivedFromDropdown();//open derived from dropdown

            components.definitions.types.selectNewInlineDerivedFrom('cloudify.aws.nodes.ACL');//select new derived from
            expect(components.definitions.types.selectedDerivedFrom()).toBe('cloudify.aws.nodes.ACL');
            expect(components.definitions.types.countProperties()).toBe(4);
            expect(components.definitions.types.countInterfaces()).toBe(3);
            components.definitions.types.closeType();//push cancel button

            browser.sleep(200).then(done);
        });
    });
    describe('inlineTypes used', function() {
        it('should delete inlineType if another inlineType not derived from this inlineType', function(done) {

            components.definitions.page.pushNewTypeBtn();//open inlineType view
            components.definitions.types.setTypeName('name');//set inlineType name
            components.definitions.types.saveType();//save inlineType view

            components.definitions.page.pushNewTypeBtn();//open inlineType view
            components.definitions.types.setTypeName('name1');//set inlineType name
            components.definitions.types.saveType();//save inlineType view

            components.definitions.page.deleteInlineTypes();//delete inlineType

            expect(components.definitions.page.countInlineTypes()).toBe(1);

            browser.sleep(200).then(done);
        });
        it('should not delete inlineType if another inlineType derived from this inlineType', function(done) {
            components.definitions.page.pushNewTypeBtn();//open inlineType view
            components.definitions.types.setTypeName('name');//set inlineType name
            components.definitions.types.openDerivedFromDropdown();//open derived from dropdown
            components.definitions.types.selectNewRelationshipDerivedFrom('name1');//select new derived from
            components.definitions.types.saveType();//save inlineType view

            components.definitions.page.clickDeleteInlineTypesBtn();//button should be disabled

            expect(components.layout.isElementPresent(element(by.css('.popover .okBtn')))).toBe(false);//popover should not show

            browser.sleep(200).then(done);
        });
    });
});