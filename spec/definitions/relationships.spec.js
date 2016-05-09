'use strict';

var components = require('../../src/components');

describe('Relationships section', function() {
    describe('login',function() {
        browser.get('/');

        components.login.login('user-' + new Date().getTime());
        // navigate to definitions tab
        browser.sleep(2000);
        components.layout.goToDefinitions();
    });
    describe('add/remove relationships', function() {

        it('should not add relationship with empty name', function(done) {
            components.definitions.page.pushNewRelationshipBtn();//open relationship view
            components.definitions.types.saveType();//save relationship view

            expect(components.layout.isElementDisplayed(element(by.cssContainingText('.definition-title-edit-error', 'Name is empty. Please select a name.')))).toBe(true);
            browser.sleep(200).then(done);

        });
        it('should add relationship name and save it', function(done) {
            components.definitions.types.setTypeName('name');//set relationship name
            components.definitions.types.saveType();//save relationship view

            expect(components.definitions.page.countRelationships()).toBe(1);
            browser.sleep(200).then(done);

        });

        it('should not add relationship if name exist', function(done) {
            components.definitions.page.pushNewRelationshipBtn();//open relationship view
            components.definitions.types.setTypeName('name');//set relationship name

            expect(components.layout.isElementDisplayed(element(by.cssContainingText('.definition-title-edit-error', 'Name already in use. Please select a different name.')))).toBe(true);
            components.definitions.types.closeType();//push cancel button
            browser.sleep(200).then(done);
        });

        it('should delete relationship', function(done) {
            components.definitions.page.deleteRelationshipTypes();//delete relationship

            expect(components.definitions.page.countRelationships()).toBe(0);
            browser.sleep(200).then(done);
        });

    });
    //describe('relationships properties', function() {
    //    // todo: write test after PR "content_type is select box CFY-4333" will be merged.
    //});
    describe('relationships interfaces', function() {

        it('should add new relationships Source Interface', function(done) {

            components.definitions.page.pushNewRelationshipBtn();//open relationship view
            expect(components.definitions.types.countInterfaces()).toBe(2);//default relationship equal 3

            components.definitions.types.pushAddNewInterfaceBtn();//push Add New Interface Btn
            expect(components.layout.isElementDisplayed(element.all(by.css('.interfaces-block .add-block')).get(0))).toBe(true);

            components.definitions.types.saveNewInterface();//save new relationship interface
            expect(components.definitions.types.countInterfaces()).toBe(3);//count interfaces

            browser.sleep(200).then(done);

        });

        it('should add operation when create Source Interface', function(done) {

            components.definitions.types.pushAddNewInterfaceBtn();//push add new interface Btn
            expect(components.layout.isElementDisplayed(element.all(by.css('.interfaces-block .add-block')).get(0))).toBe(true);

            expect(components.definitions.types.countInterfaceOperations()).toBe(1);

            components.definitions.types.addNewInterfaceOperation();//add new interface operation
            expect(components.definitions.types.countInterfaceOperations()).toBe(2);//after added new operation

            components.definitions.types.closeNewInterface();//not save new relationship interface
            expect(components.definitions.types.countInterfaces()).toBe(3);//should not add new interface

            browser.sleep(200).then(done);

        });

        it('should not add new relationship Source Interface if operation name already exist', function(done) {

            components.definitions.types.pushAddNewInterfaceBtn();//push add new interface Btn

            components.definitions.types.addNewInterfaceOperation();//add new interface operation

            components.definitions.types.createInterfaceRenameOperation('New_Operation_1');//rename interface operation

            expect(components.layout.isElementDisplayed(element.all(by.cssContainingText('.nameEditError', 'Operation name already in use. Please select a different name.')).get(0))).toBe(true);//error msg should appears
            expect(components.layout.isElementDisplayed(element.all(by.cssContainingText('.interface-config-footer span', 'Add Interface')).get(0))).toBe(false);//Add Interface btn should be hide
            expect(element(by.cssContainingText('.btn-primary', 'Save')).getAttribute('disabled')).toBe('true');//save btn should be disabled

            components.definitions.types.closeNewInterface();//not save new inlineType interface
            expect(components.definitions.types.countInterfaces()).toBe(3);//should not add new interface

            browser.sleep(200).then(done);

        });

        it('should remove operation when create Source Interface', function(done) {

            components.definitions.types.pushAddNewInterfaceBtn();//push add new relationship Btn
            components.definitions.types.addNewInterfaceOperation();//add new relationship operation
            components.definitions.types.removeInterfaceOperation();//remove operation

            expect(components.definitions.types.countInterfaceOperations()).toBe(1);//after removed new operation

            components.definitions.types.closeNewInterface();//not save new relationship interface
            expect(components.definitions.types.countInterfaces()).toBe(3);//should not add new interface

            browser.sleep(200).then(done);

        });

        it('should delete custom Source Interface', function(done) {

            expect(components.definitions.types.countInterfaces()).toBe(3);//count interfaces

            components.definitions.types.deleteInterface();//deleted custom interface
            expect(components.definitions.types.countInterfaces()).toBe(2);//after deleted custom interface

            components.definitions.types.closeType();//push cancel button
            browser.sleep(2000).then(done);

        });

        it('should not save type if interface name exist', function(done) {

            components.definitions.page.pushNewRelationshipBtn();//open relationship view

            components.definitions.types.pushAddNewInterfaceBtn();//push Add New Interface Btn
            components.definitions.types.saveNewInterface();//save new relationship interface

            components.definitions.types.pushAddNewInterfaceBtn();//push Add New Interface Btn
            components.definitions.types.saveNewInterface();//save new relationship interface

            components.definitions.types.clickInterface(0);//click inlineType interface
            components.definitions.types.renameInterface('New_interface_2', 1);//rename Interface
            expect(components.layout.isElementDisplayed(element.all(by.cssContainingText('.nameEditError', 'Interface name already in use. Please select a different name.')).get(1))).toBe(true);//interface name error msg should appears
            expect(element(by.cssContainingText('.btn-primary', 'Save')).getAttribute('disabled')).toBe('true');//save btn should be disabled

            components.definitions.types.closeType();//push cancel button
            browser.sleep(200).then(done);

        });

        it('should create Source and Target Interface with the same names and validation should pass ', function(done) {

            components.definitions.page.pushNewRelationshipBtn();//open relationship view

            components.definitions.types.pushAddNewInterfaceBtn();//push Add New Interface Btn
            components.definitions.types.saveNewInterface();//save new relationship Source interface

            components.definitions.types.pushAddNewInterfaceBtn(1);//push Add New Interface Btn
            components.definitions.types.saveNewInterface(1);//save new relationship Target interface

            expect(components.layout.isElementDisplayed(element.all(by.cssContainingText('.nameEditError', 'Interface name already in use. Please select a different name.')).get(0))).toBe(false);//interface name error msg should not appears
            expect(components.layout.isElementDisplayed(element.all(by.cssContainingText('.nameEditError', 'Operation name already in use. Please select a different name.')).get(0))).toBe(false);//operation name error msg should not appears
            expect(element(by.cssContainingText('.btn-primary', 'Save')).getAttribute('disabled')).toBe(null);//save btn should not be disabled

            components.definitions.types.closeType();//push cancel button
            browser.sleep(200).then(done);

        });

    });
    describe('relationships inputs', function() {
        it('should add new relationship input', function(done) {
            components.definitions.page.pushNewRelationshipBtn();//open relationship view
            components.definitions.types.pushAddNewInterfaceBtn();//push Add New Interface Btn
            components.definitions.types.saveNewInterface();//save new relationship interface

            components.definitions.types.openInputsBlock();//open inputs block
            expect(components.layout.isElementDisplayed($$('[ng-show="isInterfaceOperationOpen && item == selectedItem"]').get(0))).toBe(true);//inputs block is appeared

            components.definitions.types.addInput();//add custom input
            expect(components.definitions.types.countInputs()).toBe(1);//count inputs after new input was added

            components.definitions.types.saveInput();//save custom input
            browser.sleep(200).then(done);

        });
        it('should remove relationship input', function(done) {

            components.definitions.types.openInputsBlock();//open inputs block
            expect(components.definitions.types.countInputs()).toBe(1);//count inputs

            components.definitions.types.removeInput();//remove custom input
            expect(components.definitions.types.countInputs()).toBe(0);//count inputs after new input was removed
            components.definitions.types.saveInput();//save custom input

            browser.sleep(200).then(done);

        });
        it('should not save new relationship input if name already exist', function(done) {

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

            components.definitions.types.closeInputBlock();//doesn't save custom input

            browser.sleep(200).then(done);

        });

        it('should not save new relationship input', function(done) {

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
    describe('relationship derived from', function() {
        it('should change derived from', function(done) {
            components.definitions.page.pushNewRelationshipBtn();//open relationship view
            components.definitions.types.openDerivedFromDropdown();//open derived from dropdown

            components.definitions.types.selectNewRelationshipDerivedFrom('cloudify.relationships.connected_to');//select new derived from
            expect(components.definitions.types.selectedDerivedFrom()).toBe('cloudify.relationships.connected_to');
            expect(components.definitions.types.countProperties()).toBe(1);
            expect(components.definitions.types.countInterfaces()).toBe(2);
            components.definitions.types.closeType();//push cancel button

            browser.sleep(200).then(done);
        });
    });
    describe('relationship used', function() {
        it('should delete relationship if another relationship not derived from this relationship', function(done) {

            components.definitions.page.pushNewRelationshipBtn();//open relationship view
            components.definitions.types.setTypeName('name');//set relationship name
            components.definitions.types.saveType();//save relationship view

            components.definitions.page.pushNewRelationshipBtn();//open relationship view
            components.definitions.types.setTypeName('name1');//set relationship name
            components.definitions.types.saveType();//save relationship view

            components.definitions.page.deleteRelationshipTypes();//delete relationship

            expect(components.definitions.page.countRelationships()).toBe(1);

            browser.sleep(200).then(done);
        });
        it('should not delete relationship if another relationship derived from this relationship', function(done) {
            components.definitions.page.pushNewRelationshipBtn();//open relationship view
            components.definitions.types.setTypeName('name');//set relationship name
            components.definitions.types.openDerivedFromDropdown();//open derived from dropdown
            components.definitions.types.selectNewRelationshipDerivedFrom('name1');//select new derived from
            components.definitions.types.saveType();//save relationship view

            components.definitions.page.clickDeleteRelationshipBtn();//button should be disabled

            expect(components.layout.isElementPresent(element(by.css('.popover .okBtn')))).toBe(false);//popover should not show

            browser.sleep(200).then(done);
        });
    });
});