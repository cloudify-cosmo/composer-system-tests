'use strict';

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

        it('should rename property and not save properties with the same names', function(done) {
            components.definitions.types.addNewProperty();//set new inlineType property
            expect(components.definitions.types.countProperties()).toBe(2);

            components.definitions.types.clickProperty(1);//click inlineType property
            components.definitions.types.renameProperty('New_property_1', 'key', 1);//rename inlineType property
            components.definitions.types.clickEnterBtn();

            expect(components.layout.isElementDisplayed(element.all(by.cssContainingText('.nameEditError', 'Property name already in use. Please select a different name.')).get(0))).toBe(true);//error msg should appears

            expect(element(by.cssContainingText('.btn-primary', 'Save')).getAttribute('disabled')).toBe('true');//save btn should be disabled

            expect(element.all(by.repeater('property in data track by $index')).get(1).all(by.css('.select-input-height')).get(0).getText()).toBe('New_property_1');//property was renamed

            browser.sleep(200).then(done);
        });

        it('should switch to edit input mode', function(done) {

            components.definitions.types.clickProperty(1);//click inlineType property

            expect(components.layout.isElementDisplayed(element.all(by.model('property.key')).get(1))).toBe(true);//key field should be displayed
            expect(components.layout.isElementDisplayed(element.all(by.model('property.default')).get(1))).toBe(true);//default field btn should be displayed (we use autocomplete and he duplicate input)
            expect(components.layout.isElementDisplayed(element.all(by.model('property.description')).get(1))).toBe(true);//description field btn should be displayed

            browser.sleep(200).then(done);
        });

        it('should not close edit input mode if click on the area what renaming', function(done) {

            components.definitions.types.clickProperty(1);//click on the same property

            expect(components.layout.isElementDisplayed(element.all(by.model('property.key')).get(1))).toBe(true);//key field should be displayed
            expect(components.layout.isElementDisplayed(element.all(by.model('property.default')).get(1))).toBe(true);//default field btn should be displayed (we use autocomplete and he duplicate input)
            expect(components.layout.isElementDisplayed(element.all(by.model('property.description')).get(1))).toBe(true);//description field btn should be displayed

            browser.sleep(200).then(done);
        });

        it('should not rename field if click esc but should switch off edit mode', function(done) {

            components.definitions.types.renameProperty('New_property_5', 'key', 1);//rename inlineType property
            components.definitions.types.renameProperty('default', 'default', 1);//rename inlineType property
            components.definitions.types.renameProperty('description', 'description', 1);//rename inlineType property

            components.definitions.types.clickEscBtn();

            expect(element.all(by.repeater('property in data track by $index')).get(1).all(by.css('.select-input-height')).get(0).getText()).toBe('New_property_1');//property wasn't renamed
            expect(element.all(by.repeater('property in data track by $index')).get(1).all(by.css('.select-input-height')).get(1).getText()).toBe('');//property wasn't renamed
            expect(element.all(by.repeater('property in data track by $index')).get(1).all(by.css('.select-input-height')).get(2).getText()).toBe('');//property wasn't renamed


            expect(components.layout.isElementDisplayed(element.all(by.model('property.key')).get(1))).toBe(false);//key field should be displayed
            expect(components.layout.isElementDisplayed(element.all(by.model('property.default')).get(1))).toBe(false);//default field btn should be displayed (we use autocomplete and he duplicate input)
            expect(components.layout.isElementDisplayed(element.all(by.model('property.description')).get(1))).toBe(false);//description field btn should be displayed
            console.log(10);
            browser.sleep(200).then(done);
        });

        it('should not rename field if click by another property but should switch edit mode on new property', function(done) {

            components.definitions.types.clickProperty(1);//click inlineType property

            components.definitions.types.renameProperty('New_property_5', 'key', 1);//rename inlineType property
            components.definitions.types.renameProperty('default', 'default', 1);//rename inlineType property
            components.definitions.types.renameProperty('description', 'description', 1);//rename inlineType property

            components.definitions.types.clickProperty(0);//click inlineType property

            expect(element.all(by.repeater('property in data track by $index')).get(1).all(by.css('.select-input-height')).get(0).getText()).toBe('New_property_1');//property wasn't renamed
            expect(element.all(by.repeater('property in data track by $index')).get(1).all(by.css('.select-input-height')).get(1).getText()).toBe('');//property wasn't renamed
            expect(element.all(by.repeater('property in data track by $index')).get(1).all(by.css('.select-input-height')).get(2).getText()).toBe('');//property wasn't renamed


            expect(components.layout.isElementDisplayed(element.all(by.model('property.key')).get(1))).toBe(false);//key field should not be displayed
            expect(components.layout.isElementDisplayed(element.all(by.model('property.default')).get(1))).toBe(false);//default field btn should not be displayed (we use autocomplete and he duplicate input)
            expect(components.layout.isElementDisplayed(element.all(by.model('property.description')).get(1))).toBe(false);//description field btn not should be displayed

            expect(components.layout.isElementDisplayed(element.all(by.model('property.key')).get(0))).toBe(true);//key field should be displayed (first property)
            expect(components.layout.isElementDisplayed(element.all(by.model('property.default')).get(0))).toBe(true);//default field btn should be displayed (we use autocomplete and he duplicate input) (first property)
            expect(components.layout.isElementDisplayed(element.all(by.model('property.description')).get(0))).toBe(true);//description field btn should be displayed (first property)

            browser.sleep(200).then(done);
        });

        it('should rename field', function(done) {

            components.definitions.types.clickProperty(1);//click inlineType property

            components.definitions.types.renameProperty('New_property_5', 'key', 1);//rename inlineType property
            components.definitions.types.renameProperty('default', 'default', 1);//rename inlineType property
            components.definitions.types.renameProperty('description', 'description', 1);//rename inlineType property

            components.definitions.types.clickEnterBtn();//click inlineType property

            expect(element.all(by.repeater('property in data track by $index')).get(1).all(by.css('.select-input-height')).get(0).getText()).toBe('New_property_5');//property wasn't renamed
            expect(element.all(by.repeater('property in data track by $index')).get(1).all(by.css('.select-input-height')).get(1).getText()).toBe('default');//property wasn't renamed
            expect(element.all(by.repeater('property in data track by $index')).get(1).all(by.css('.select-input-height')).get(2).getText()).toBe('description');//property wasn't renamed


            expect(components.layout.isElementDisplayed(element.all(by.model('property.key')).get(1))).toBe(false);//key field should not be displayed
            expect(components.layout.isElementDisplayed(element.all(by.model('property.default')).get(1))).toBe(false);//default field btn should not be displayed (we use autocomplete and he duplicate input)
            expect(components.layout.isElementDisplayed(element.all(by.model('property.description')).get(1))).toBe(false);//description field btn not should be displayed

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

            components.definitions.types.addNewInterfaceOperation(0);//add new interface operation
            expect(components.definitions.types.countInterfaceOperations()).toBe(2);//after added new operation

            components.definitions.types.closeNewInterface();//not save new inlineType interface
            expect(components.definitions.types.countInterfaces()).toBe(4);//should not add new interface

            browser.sleep(200).then(done);

        });

        it('should not add new inlineType interface if operation name already exist', function(done) {

            components.definitions.types.pushAddNewInterfaceBtn();//push add new interface Btn

            components.definitions.types.addNewInterfaceOperation(0);//add new interface operation

            components.definitions.types.createInterfaceRenameOperation('New_Operation_1');//rename inlineType interface operation

            expect(components.layout.isElementDisplayed(element.all(by.cssContainingText('.nameEditError', 'Operation name already in use. Please select a different name.')).get(0))).toBe(true);//error msg should appears
            expect(components.layout.isElementDisplayed(element(by.cssContainingText('.interface-config-footer span', 'Add Interface')))).toBe(false);//Add Interface btn should be hide
            expect(element(by.cssContainingText('.btn-primary', 'Save')).getAttribute('disabled')).toBe('true');//save btn should be disabled
            components.definitions.types.closeNewInterface();//not save new inlineType interface
            expect(components.definitions.types.countInterfaces()).toBe(4);//should not add new interface

            browser.sleep(200).then(done);

        });

        it('should remove operation when creating interface', function(done) {

            components.definitions.types.pushAddNewInterfaceBtn();//push add new interface Btn
            components.definitions.types.addNewInterfaceOperation(0);//add new interface operation
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

            components.definitions.types.clickInterface(0);//click inlineType interface
            components.definitions.types.renameInterface('New_interface_4', 1);//rename Interface
            components.definitions.types.clickEnterBtn();
            expect(components.layout.isElementDisplayed(element.all(by.cssContainingText('.nameEditError', 'Interface name already in use. Please select a different name.')).get(1))).toBe(true);//interface name error msg should appears
            expect(element(by.cssContainingText('.btn-primary', 'Save')).getAttribute('disabled')).toBe('true');//save btn should be disabled

            console.log(20);

            browser.sleep(200).then(done);

        });

        it('should switch to edit interface mode', function(done) {

            components.definitions.types.clickInterface(0);//click inlineType property

            expect(components.layout.isElementDisplayed(element.all(by.repeater('interface in data track by $index')).get(0).element(by.model('interface.key')))).toBe(true);//key field should be displayed

            browser.sleep(200).then(done);
        });

        it('should not close edit interface mode if click on the area what renaming', function(done) {

            components.definitions.types.clickInterface(0);//click on the same interface

            expect(components.layout.isElementDisplayed(element.all(by.repeater('interface in data track by $index')).get(0).element(by.model('interface.key')))).toBe(true);//key field should be displayed

            browser.sleep(200).then(done);
        });

        it('should not rename field if click esc but should switch off edit mode', function(done) {

            components.definitions.types.renameInterface('New_interface_10', 1);//rename Interface

            components.definitions.types.clickEscBtn();

            expect(element.all(by.repeater('interface in data track by $index')).get(0).all(by.css('.select-input-height')).get(0).getText()).toBe('New_interface_4');//interface wasn't renamed

            expect(components.layout.isElementDisplayed(element.all(by.repeater('interface in data track by $index')).get(0).element(by.model('interface.key')))).toBe(false);//key field should not be displayed

            browser.sleep(200).then(done);
        });
        it('should not rename field if click by another interface field but should switch edit mode on new interface', function(done) {

            components.definitions.types.clickInterface(0);//click inlineType interface
            components.definitions.types.renameInterface('New_interface_10', 1);//rename Interface

            components.definitions.types.clickInterface(1);//click inlineType interface

            expect(element.all(by.repeater('interface in data track by $index')).get(0).all(by.css('.select-input-height')).get(0).getText()).toBe('New_interface_4');//interface wasn't renamed

            expect(components.layout.isElementDisplayed(element.all(by.repeater('interface in data track by $index')).get(0).element(by.model('interface.key')))).toBe(false);//key field should not be displayed

            expect(components.layout.isElementDisplayed(element.all(by.repeater('interface in data track by $index')).get(1).element(by.model('interface.key')))).toBe(true);//key field should be displayed (second interface)
            components.definitions.types.clickEscBtn();
            browser.sleep(200).then(done);
        });

        it('should rename interface field', function(done) {

            components.definitions.types.clickInterface(0);//click inlineType interface
            components.definitions.types.renameInterface('New_interface_10', 1);//rename Interface

            components.definitions.types.clickEnterBtn();

            expect(element.all(by.repeater('interface in data track by $index')).get(0).all(by.css('.select-input-height')).get(0).getText()).toBe('New_interface_10');//interface was renamed

            expect(components.layout.isElementDisplayed(element.all(by.repeater('interface in data track by $index')).get(0).element(by.model('interface.key')))).toBe(false);//key field should not be displayed

            browser.sleep(200).then(done);
        });

        it('should switch to edit operation mode', function(done) {

            components.definitions.types.addNewInterfaceOperation(1);//add new interface operation
            components.definitions.types.clickOperation(2);//click operation

            expect(components.layout.isElementDisplayed(element.all(by.repeater('item in interface.data track by $index')).get(2).element(by.model('item.operation ')))).toBe(true);//operation field should be displayed
            expect(components.layout.isElementDisplayed(element.all(by.repeater('item in interface.data track by $index')).get(2).all(by.model('item.implementation ')).get(0))).toBe(true);//implementation field should be displayed

            browser.sleep(200).then(done);
        });
        it('should not close edit operation mode if click on the area what renaming', function(done) {

            components.definitions.types.clickOperation(2);//click on the same interface

            expect(components.layout.isElementDisplayed(element.all(by.repeater('item in interface.data track by $index')).get(2).element(by.model('item.operation ')))).toBe(true);//operation field should be displayed
            expect(components.layout.isElementDisplayed(element.all(by.repeater('item in interface.data track by $index')).get(2).all(by.model('item.implementation ')).get(0))).toBe(true);//implementation field should be displayed

            browser.sleep(200).then(done);
        });

        it('should not rename field if click esc but should switch off edit mode', function(done) {
            components.definitions.types.renameOperation('New_operation_10','operation ', 0);//rename operation
            components.definitions.types.renameOperation('implementation','implementation ', 0);//rename implementation
            //
            components.definitions.types.clickEscBtn();

            expect(element.all(by.repeater('item in interface.data track by $index')).get(2).all(by.css('.select-input-height')).get(0).getText()).toBe('New_Operation_1');//operation wasn't renamed
            expect(element.all(by.repeater('item in interface.data track by $index')).get(2).all(by.css('.select-input-height')).get(1).getText()).toBe('');//implementation wasn't renamed

            expect(components.layout.isElementDisplayed(element.all(by.repeater('item in interface.data track by $index')).get(2).element(by.model('item.operation ')))).toBe(false);//operation field should not be displayed
            expect(components.layout.isElementDisplayed(element.all(by.repeater('item in interface.data track by $index')).get(2).all(by.model('item.implementation ')).get(0))).toBe(false);//implementation field should not be displayed

            browser.sleep(200).then(done);
        });


        it('should not rename field if click by another operation field but should switch edit mode on new operation', function(done) {

            components.definitions.types.clickOperation(2);//click inlineType operation
            components.definitions.types.renameOperation('New_operation_10', 'operation ', 0);//rename operation
            components.definitions.types.renameOperation('implementation', 'implementation ', 0);//rename implementation

            components.definitions.types.clickOperation(3);//click inlineType interface

            expect(element.all(by.repeater('item in interface.data track by $index')).get(2).all(by.css('.select-input-height')).get(0).getText()).toBe('New_Operation_1');//operation wasn't renamed
            expect(element.all(by.repeater('item in interface.data track by $index')).get(2).all(by.css('.select-input-height')).get(1).getText()).toBe('');//implementation wasn't renamed

            expect(components.layout.isElementDisplayed(element.all(by.repeater('item in interface.data track by $index')).get(2).element(by.model('item.operation ')))).toBe(false);//operation field should not be displayed
            expect(components.layout.isElementDisplayed(element.all(by.repeater('item in interface.data track by $index')).get(2).all(by.model('item.implementation ')).get(0))).toBe(false);//implementation field should not be displayed


            expect(components.layout.isElementDisplayed(element.all(by.repeater('item in interface.data track by $index')).get(3).element(by.model('item.operation ')))).toBe(true);//operation field should  be displayed (second operation)
            expect(components.layout.isElementDisplayed(element.all(by.repeater('item in interface.data track by $index')).get(3).all(by.model('item.implementation ')).get(0))).toBe(true);//implementation field should  be displayed (second operation)

            components.definitions.types.clickEscBtn();
            browser.sleep(200).then(done);
        });

        it('should rename operation field', function(done) {

            components.definitions.types.clickOperation(2);//click inlineType operation
            components.definitions.types.renameOperation('New_operation_10', 'operation ', 0);//rename operation
            components.definitions.types.renameOperation('implementation', 'implementation ', 0);//rename implementation

            components.definitions.types.clickEnterBtn();

            expect(element.all(by.repeater('interface in data track by $index')).get(0).all(by.css('.select-input-height')).get(0).getText()).toBe('New_interface_10');//operation was renamed
            expect(element.all(by.repeater('interface in data track by $index')).get(0).all(by.css('.select-input-height')).get(2).getText()).toBe('implementation');//implementation was renamed

            expect(components.layout.isElementDisplayed(element.all(by.repeater('item in interface.data track by $index')).get(2).element(by.model('item.operation ')))).toBe(false);//operation field should not be displayed
            expect(components.layout.isElementDisplayed(element.all(by.repeater('item in interface.data track by $index')).get(2).all(by.model('item.implementation ')).get(0))).toBe(false);//implementation field should not be displayed

            components.definitions.types.closeType();//push cancel button

            console.log(30);

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

            components.definitions.types.clickInput(0);
            components.definitions.types.renameInput('New_Input_2', 'name');//rename custom input
            components.definitions.types.clickEnterBtn();

            expect(components.layout.isElementDisplayed(element.all(by.cssContainingText('.nameEditError', 'Input name already in use. Please select a different name.')).get(0))).toBe(true);//error msg should appears
            expect(components.layout.isElementDisplayed(element.all(by.cssContainingText('.interface-config-footer span', 'Save Changes')).get(0))).toBe(false); //save btn should be hide
            expect(element(by.cssContainingText('.btn-primary', 'Save')).getAttribute('disabled')).toBe('true'); //save btn should be disabled

            browser.sleep(200).then(done);

        });

        it('should switch to edit input mode', function(done) {

            components.definitions.types.clickInput(0);//click inlineType input
            expect(components.layout.isElementDisplayed(element.all(by.model('option.name')).get(0))).toBe(true);//name field should be displayed
            expect(components.layout.isElementDisplayed(element.all(by.model('option.description')).get(0))).toBe(true);//default field btn should be displayed (we use autocomplete and he duplicate input)
            expect(components.layout.isElementDisplayed(element.all(by.model('option.default ')).get(0))).toBe(true);//description field btn should be displayed

            browser.sleep(200).then(done);
        });

        it('should not close edit input mode if click on the area what renaming', function(done) {

            components.definitions.types.clickInput(0);//click on the same input

            expect(components.layout.isElementDisplayed(element.all(by.model('option.name')).get(0))).toBe(true);//key field should be displayed
            expect(components.layout.isElementDisplayed(element.all(by.model('option.description')).get(0))).toBe(true);//default field btn should be displayed (we use autocomplete and he duplicate input)
            expect(components.layout.isElementDisplayed(element.all(by.model('option.default ')).get(0))).toBe(true);//description field btn should be displayed

            browser.sleep(200).then(done);
        });

        it('should not rename field if click esc but should switch off edit mode', function(done) {

            components.definitions.types.renameInput('New_input_5', 'name');//rename inlineType input
            components.definitions.types.renameInput('default', 'default ');//rename inlineType input
            components.definitions.types.renameInput('description', 'description');//rename inlineType input

            components.definitions.types.clickEscBtn();

            expect(element.all(by.repeater('option in item.data track by $index')).get(0).all(by.css('.select-input-height')).get(0).getText()).toBe('New_Input_2');//property wasn't renamed
            expect(element.all(by.repeater('option in item.data track by $index')).get(0).all(by.css('.select-input-height')).get(1).getText()).toBe('');//property wasn't renamed
            expect(element.all(by.repeater('option in item.data track by $index')).get(0).all(by.css('.select-input-height')).get(2).getText()).toBe('');//property wasn't renamed


            expect(components.layout.isElementDisplayed(element.all(by.model('option.name')).get(0))).toBe(false);//name field should be displayed
            expect(components.layout.isElementDisplayed(element.all(by.model('option.description')).get(0))).toBe(false);//default field btn should be displayed (we use autocomplete and he duplicate input)
            expect(components.layout.isElementDisplayed(element.all(by.model('option.default ')).get(0))).toBe(false);//description field btn should be displayed

            browser.sleep(200).then(done);
        });

        it('should not rename field if click by another input but should switch edit mode on new input', function(done) {

            components.definitions.types.clickInput(0);//click inlineType input

            components.definitions.types.renameInput('New_input_5', 'name');//rename inlineType input
            components.definitions.types.renameInput('default', 'default ');//rename inlineType input
            components.definitions.types.renameInput('description', 'description');//rename inlineType input

            components.definitions.types.clickInput(1);//click inlineType input

            expect(element.all(by.repeater('option in item.data track by $index')).get(0).all(by.css('.select-input-height')).get(0).getText()).toBe('New_Input_2');//input wasn't renamed
            expect(element.all(by.repeater('option in item.data track by $index')).get(0).all(by.css('.select-input-height')).get(1).getText()).toBe('');//input wasn't renamed
            expect(element.all(by.repeater('option in item.data track by $index')).get(0).all(by.css('.select-input-height')).get(2).getText()).toBe('');//input wasn't renamed


            expect(components.layout.isElementDisplayed(element.all(by.model('option.name')).get(0))).toBe(false);//name field should not be displayed
            expect(components.layout.isElementDisplayed(element.all(by.model('option.default ')).get(0))).toBe(false);//default field btn should not be displayed
            expect(components.layout.isElementDisplayed(element.all(by.model('option.description')).get(0))).toBe(false);//description field btn not should be displayed

            expect(components.layout.isElementDisplayed(element.all(by.model('option.name')).get(1))).toBe(true);//name field should be displayed (first input)
            expect(components.layout.isElementDisplayed(element.all(by.model('option.default ')).get(1))).toBe(true);//default field btn should be displayed (first input)
            expect(components.layout.isElementDisplayed(element.all(by.model('option.description')).get(1))).toBe(true);//description field btn should be displayed (first input)

            browser.sleep(200).then(done);
        });

        it('should rename field', function(done) {

            components.definitions.types.clickInput(0);//click inlineType input

            components.definitions.types.renameInput('New_input_5', 'name');//rename inlineType input
            components.definitions.types.renameInput('default', 'default ');//rename inlineType input
            components.definitions.types.renameInput('description', 'description');//rename inlineType input

            components.definitions.types.clickEnterBtn();

            expect(element.all(by.repeater('option in item.data track by $index')).get(0).all(by.css('.select-input-height')).get(0).getText()).toBe('New_input_5');//input wasn't renamed
            expect(element.all(by.repeater('option in item.data track by $index')).get(0).all(by.css('.select-input-height')).get(1).getText()).toBe('description');//input wasn't renamed
            expect(element.all(by.repeater('option in item.data track by $index')).get(0).all(by.css('.select-input-height')).get(2).getText()).toBe('default');//input wasn't renamed


            expect(components.layout.isElementDisplayed(element.all(by.model('option.name')).get(0))).toBe(false);//name field should not be displayed
            expect(components.layout.isElementDisplayed(element.all(by.model('option.default ')).get(0))).toBe(false);//default field btn should not be displayed
            expect(components.layout.isElementDisplayed(element.all(by.model('option.description')).get(0))).toBe(false);//description field btn not should be displayed

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
        it('should change derived from, change and save new default property value', function(done) {
            components.definitions.page.pushNewTypeBtn();//open inlineType view
            components.definitions.types.openDerivedFromDropdown();//open derived from dropdown
            components.definitions.types.setTypeName('test');//set inlineType name
            components.definitions.types.selectNewInlineDerivedFrom('cloudify.nodes.CloudifyManager');//select new derived from
            expect(components.definitions.types.selectedDerivedFrom()).toBe('cloudify.nodes.CloudifyManager');
            expect(components.definitions.types.countProperties()).toBe(2);
            expect(components.definitions.types.countInterfaces()).toBe(3);


            components.definitions.types.clickProperty(0);//click inlineType property
            components.definitions.types.renameProperty('new default value', 'default', 0);//rename inlineType property
            components.definitions.types.clickEnterBtn();

            expect(element.all(by.repeater('property in data track by $index')).get(0).all(by.css('.select-input-height')).get(1).getText()).toBe('new default value');

            components.definitions.types.saveType();//save inlineType view

            console.log(40);

            browser.sleep(200).then(done);
        });
        it('should not set default value in property on the edit page', function(done) {
            components.definitions.types.openSavedType(0);//open saved inlineType view

            expect(element.all(by.repeater('property in data track by $index')).get(0).all(by.css('.select-input-height')).get(1).getText()).toBe('new default value');

            components.definitions.types.saveType();//save inlineType view

            browser.sleep(200).then(done);
        });
        it('should not set default value in property on the edit page after saving blueprint', function(done) {
            components.layout.saveBlueprint();
            components.definitions.types.openSavedType(0);//open saved inlineType view

            expect(components.definitions.types.countProperties()).toBe(2);
            expect(components.definitions.types.countInterfaces()).toBe(3);

            expect(element.all(by.repeater('property in data track by $index')).get(0).all(by.css('.select-input-height')).get(1).getText()).toBe('new default value');

            components.definitions.types.saveType();//save inlineType view
            components.definitions.page.deleteInlineTypes();//delete inlineType
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

            browser.sleep(1000).then(done);
        });
    });
});