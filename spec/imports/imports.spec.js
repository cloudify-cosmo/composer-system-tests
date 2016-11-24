'use strict';
//var fs = require('fs-extra');
var logger = require('log4js').getLogger('Plugins-e2e');
//var _ = require('lodash');
var components = require('../../src/components');

describe('imports section', function() {
    describe('login', function() {
        browser.get('/');
        components.login.loginDefault();
        // navigate to definitions tab
        browser.sleep(1000);
        logger.info('navigate to imports tab');
        components.layout.goToImports();
    });

    describe('imports field', function() {
        it('import url should exist', function(done) {
            expect(components.layout.countElements(element.all(by.repeater('imports in globals.stencils.importsData')))).toBe(1);//default amount of imports
            browser.sleep(200).then(done);
        });
        it('should open then close import modal view', function(done) {
            components.imports.page.openImportsViewDialog();//click show modal with import data btn
            expect(components.layout.isElementDisplayed(element(by.css('.modal.fade.in')))).toBe(true);//modal should appear
            components.modals.modal.cancelUsingSelector();//click cancel btn
            expect(components.layout.isElementPresent(element(by.css('.modal.fade.in')))).toBe(false);//modal should disappear

            browser.sleep(200).then(done);
        });
        it('check imports delete', function(done) {
            components.imports.page.openImportsDeletePopover(); //click delete icon
            components.popovers.popover.clickNo();//click no btn
            expect(components.layout.countElements(element.all(by.repeater('imports in globals.stencils.importsData')))).toBe(1);//number of imports should not change

            components.imports.page.openImportsDeletePopover();//click delete icon
            components.popovers.popover.clickYes();//click yes btn
            expect(components.layout.countElements(element.all(by.repeater('imports in globals.stencils.importsData')))).toBe(0);//minus one import

            browser.sleep(200).then(done);
        });
        it('should add import by url', function(done) {
            components.layout.goToTopology();
            components.imports.page.openAddImportsDialog(); // the link bellow the stencils list in topology view
            components.modals.modal.enterUrl('http://getcloudify.org.s3.amazonaws.com/spec/chef-plugin/1.3.1/plugin.yaml', 'imports');
            components.modals.modal.save();
            expect(components.layout.countElements(element.all(by.repeater('imports in globals.stencils.importsData')))).toBe(1);//plus one import

            browser.sleep(200).then(done);
        });
    });

    describe('Save imports', function() {
        it('should add and save imports', function(done){
            components.layout.goToTopology();
            components.imports.page.openAddImportsDialog();
            components.modals.modal.enterUrl('http://getcloudify.org.s3.amazonaws.com/spec/docker-plugin/1.3/plugin.yaml', 'imports');
            components.modals.modal.save();

            components.layout.saveBlueprint(); //click save blueprint button
            browser.sleep(200).then(done);

            browser.driver.navigate().refresh();
            expect(components.layout.countElements(element.all(by.repeater('imports in globals.stencils.importsData')))).toBe(2);
            browser.sleep(200).then(done);
        });
        it('should add and delete imports', function(done){

            components.imports.page.openImportsDeletePopover(); //click delete icon
            components.popovers.popover.clickYes();//click no btn

            components.layout.saveBlueprint(); //click save blueprint button
            browser.sleep(200);
            browser.driver.navigate().refresh();
            expect(components.layout.countElements(element.all(by.repeater('imports in globals.stencils.importsData')))).toBe(1);
            browser.sleep(200).then(done);
        });
    });

    describe('node types field', function() {
        it('node types should exist', function(done) {
            expect(components.layout.countElements(element.all(by.repeater('nodeType in globals.stencils.nodeTypes')))).toBe(5);//default amount of node types
            browser.sleep(200).then(done);
        });
        it('should orderBy type', function(done) {
            components.imports.page.orderByNodeType();
            expect(components.imports.page.checkFirstNodeType()).toBe('cloudify.chef.nodes.WebServer');//last node type

            browser.sleep(200).then(done);
        });
        it('should change used field for node types and remove node types if import was deleted', function(done) {

            components.layout.goToTopology();
            var dragItem = components.topology.page.findSpecificNodeContainerOnTopologyPage('cloudify.chef', 'WebServer');
            var dragDest = element(by.id('topologyContainer'));
            components.layout.dragAndDrop(dragItem, dragDest); //add node - meaning the type is being used.

            components.layout.goToImports();
            expect(components.imports.page.findSpecificUsedOnImportsPage().getText()).toBe('1');
            components.imports.page.openImportsDeletePopover();//click delete icon
            components.popovers.popover.clickYes();
            expect(components.layout.isElementPresent(components.imports.page.findSpecificUsedOnImportsPage())).toBe(false);

            browser.sleep(200).then(done);
        });
    });

});