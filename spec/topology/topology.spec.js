
'use strict';
var components = require('../../src/components');

/**
 *  * Important *
 * The tests assume there's a user saved as static_test_user which has only one saved blueprint which contains
 * one node template of a web_server type.
 */
describe('topology section', () => {

    beforeEach(() => {
        browser.get('/#/login');
        components.login.login('static_test_user');
    });

    xdescribe('select wanted blueprint', () => {
        it('should be able to select wanted blueprint from dropdown ', (done) => {
            done();
           //  var result = components.topology.page.getBlueprintsList();
        });
    });


    describe('rename node in node panel', () => {
        it('should be able to rename node ', (done) => {

            components.topology.page.openNodePanel();
            browser.sleep(1000);
            var name = components.topology.page.getNodeName();
            components.topology.page.renameNode(); // appends _newName str to existing node name
            browser.sleep(1000);
            var newName = components.topology.page.getNodeName(); // gets new node name
            expect(name).not.toBe(newName);
            components.topology.page.closeNodePanel();
            browser.sleep(1000).then(done);
        });
    });

    describe('set number of instances', () => {
        it('should be able to set new number of instances ', (done) => {

            components.topology.page.openNodePanel();
            browser.sleep(1000);
            var expectedInstancesNum = '3';
            components.topology.page.setNewInstancesNumber(expectedInstancesNum); // changes the instances number
            components.topology.page.closeNodePanel();
            browser.sleep(1000);
            components.topology.page.verifyNewInstanceNumberUpdate(expectedInstancesNum); // checks that the instances number was updated according to expected number

            browser.sleep(1000).then(done);
        });
    });

    describe('set properties ', () => {

        it('should be able to edit port from its modal', (done) => {
            components.topology.page.openNodePanel();
            browser.sleep(1000);
            components.topology.page.openPortEditModal();
            browser.sleep(1000);
            components.topology.page.copyPortToEditor();
            browser.sleep(1000);
            components.topology.page.savePropsEditor();
            browser.sleep(3000);
            components.topology.page.closeNodePanel();
            browser.sleep(1000).then(done);
        });

        it('should be able to select operation from implementation modal', (done) => {
            components.topology.page.openNodePanel();
            browser.sleep(1000);
            components.topology.page.openInterfacesEditModal();
            browser.sleep(1000);
            components.topology.page.openImplementationEditModal();
            browser.sleep(2000);
            components.topology.page.saveSelectedOperation(); // selects chef_plugin.operations.operation from list operations and saves it.
            browser.sleep(3000);
            components.topology.page.closeNodePanel();
            browser.sleep(1000).then(done);
        });

        it('should be able to add new input to lifecycle', (done) => {
            components.topology.page.openNodePanel();
            browser.sleep(1000);
            components.topology.page.openInterfacesEditModal();
            browser.sleep(1000);
            components.topology.page.addInput(); // adds new input
            browser.sleep(1000);

            //components.topology.page.getInputName();
            components.topology.page.editInput();
            browser.actions().sendKeys(protractor.Key.ENTER).perform();

            browser.sleep(3000);
            components.topology.page.closeNodePanel();
            browser.sleep(1000).then(done);
        });
    });



});