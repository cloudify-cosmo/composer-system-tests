'use strict';
var fs = require('fs-extra');
var logger = require('log4js').getLogger('Plugins-e2e');
var _ = require('lodash');
var components = require('../../src/components');

describe('imports section', function() {
    describe('login', function() {
        browser.get('/');

        components.login.login('user-' + new Date().getTime());
        // navigate to definitions tab
        browser.sleep(1000);
        logger.info('navigate to imports tab');
        components.layout.goToImports();
    });

    describe('imports field', function() {
        it('import url should exist', function(done) {
            expect(components.imports.page.countElements(element.all(by.repeater('imports in globals.stencils.importsData')))).toBe(9);//default amount of imports
            browser.sleep(200).then(done);
        });
        it('should open then close import modal view', function(done) {
            components.imports.page.openImportsViewDialog();//click show modal with import data btn
            expect(components.imports.page.isElementDisplayed(element(by.css('.modal.fade.in')))).toBe(true);//modal should appear

            components.modals.modal.cancelUsingSelector();//click cancel btn
            expect(components.imports.page.isElementPresent(element(by.css('.modal.fade.in')))).toBe(false);//modal should disappear

            browser.sleep(200).then(done);
        });

        it('check imports delete', function(done) {
            components.imports.page.openImportsDeletePopover(); //click delete icon
            components.popovers.popover.clickNo();//click no btn
            expect(components.imports.page.countElements(element.all(by.repeater('imports in globals.stencils.importsData')))).toBe(9);//number of imports should not change

            components.imports.page.openImportsDeletePopover();//click delete icon
            components.popovers.popover.clickYes();//click yes btn
            expect(components.imports.page.countElements(element.all(by.repeater('imports in globals.stencils.importsData')))).toBe(8);//minus one import

            browser.sleep(200).then(done);
        });
        it('should add import by url', function(done) {
            browser.refresh();
            components.imports.page.openAddImportsDialog();
            components.modals.modal.enterUrl('http://getcloudify.org.s3.amazonaws.com/spec/chef-plugin/1.3.1/plugin.yaml', 'imports');
            components.modals.modal.save();
            expect(components.imports.page.countElements(element.all(by.repeater('imports in globals.stencils.importsData')))).toBe(10);//plus one import

            browser.sleep(200).then(done);
        });

    });
    describe('node types field', function() {
        it('node types should exist', function(done) {
            expect(components.imports.page.countElements(element.all(by.repeater('nodeType in globals.stencils.nodeTypes')))).toBe(62);//default amount of node types
            browser.sleep(200).then(done);
        });
        it('should orderBy type', function(done) {
            components.imports.page.orderByNodeType();
            expect(components.imports.page.checkFirstNodeType()).toBe('cloudify.puppet.nodes.WebServer');//last node type

            browser.sleep(200).then(done);
        });
        it('should change used field for node types', function(done) {
            components.layout.goToTopology();
            //add node on topology page
            var dragItem = components.imports.page.findSpecificContainerOnTopologyPage();
            var dragDest = element(by.id('topologyContainer'));
            components.layout.dragAndDrop(dragItem, dragDest);//add node

            components.layout.goToImports();
            expect(components.imports.page.findSpecificUsedOnImportsPage().getText()).toBe('1');//node types 'docker' used field

            components.layout.goToTopology();
            //delete node on topology page
            element(by.css('.nodeContainer')).click();
            element(by.css('#deleteBtn')).click();
            components.popovers.popover.clickYes();

            components.layout.goToImports();
            expect(components.imports.page.findSpecificUsedOnImportsPage().getText()).toBe('0');//node types 'docker' used field

            browser.sleep(200).then(done);
        });
        it('should remove node types if import was deleted', function(done) {
            components.imports.page.openSpecificDeletePopover(components.imports.page.findSpecificUrl()); //click delete icon
            components.popovers.popover.clickYes();//click no btn
            expect(components.imports.page.isElementPresent(components.imports.page.findSpecificUsedOnImportsPage())).toBe(false);


            browser.sleep(200).then(done);
        });
    });
    describe('Save imports', function() {
        it('should add and save imports', function(done){
            components.imports.page.openAddImportsDialog();
            components.modals.modal.enterUrl('http://getcloudify.org.s3.amazonaws.com/spec/chef-plugin/1.3.1/plugin.yaml', 'imports');
            components.modals.modal.save();

            components.layout.saveBlueprint(); //click save blueprint button
            browser.refresh();

            expect(components.imports.page.countElements(element.all(by.repeater('imports in globals.stencils.importsData')))).toBe(10);

            browser.sleep(200).then(done);

        });
        it('should add and delete imports', function(done){

            components.imports.page.openImportsDeletePopover(); //click delete icon
            components.popovers.popover.clickYes();//click no btn

            components.layout.saveBlueprint(); //click save blueprint button
            browser.sleep(200);
            browser.refresh();

            expect(components.imports.page.countElements(element.all(by.repeater('imports in globals.stencils.importsData')))).toBe(9);

            browser.sleep(1000).then(done);

        });
    });

});