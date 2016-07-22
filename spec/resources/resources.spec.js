'use strict';

var components = require('../../src/components');

describe('resources page', function () {
    describe('login', function () {
        browser.get('/');

        components.login.login('user-' + new Date().getTime());
        // navigate to resource tab
        browser.sleep(1000);
        components.layout.goToResources();
    });

    describe('folder behavior', function () {
        it('should add folder', function (done) {
            // click add folder
            components.resources.page.addFolder();
            expect(components.resources.page.countResources()).toBe(2);
            browser.sleep(200).then(done);

        });
        it('should not delete folder', function (done) {
            components.resources.page.deleteItem(1);
            components.popovers.popover.clickNo();//click no btn
            expect(components.resources.page.countResources()).toBe(2);

            browser.sleep(200).then(done);
        });
        it('should delete folder', function (done) {
            components.resources.page.deleteItem(1);
            components.popovers.popover.clickYes();//click no btn
            expect(components.resources.page.countResources()).toBe(1);

            browser.sleep(200).then(done);
        });
        it('should add folder in a current folder', function (done) {
            components.resources.page.addFolder();
            components.resources.page.selectFolder(1);
            components.resources.page.addFolder();

            expect(components.resources.page.countResources()).toBe(3);
            expect(element.all(by.css('.fa-caret-right')).get(0).isDisplayed()).toBe(true);//arrow appears in front of folder it means we added folder in a current folder
            browser.sleep(200).then(done);

        });
        it('should open folder', function (done) {
            components.resources.page.openFolder(0);

            expect(element.all(by.css('.fa-caret-right')).get(0).isDisplayed()).toBe(false);
            expect(element.all(by.css('.fa-caret-down')).get(1).isDisplayed()).toBe(true);
            expect(element.all(by.repeater('treeNode in items track by $index')).get(1).isDisplayed()).toBe(true);
            browser.sleep(200).then(done);

        });
        it('should close folder', function (done) {
            components.resources.page.closeFolder(1);

            expect(element.all(by.css('.fa-caret-right')).get(0).isDisplayed()).toBe(true);
            expect(element.all(by.repeater('treeNode in items track by $index')).get(2).isDisplayed()).toBe(false);
            browser.sleep(200).then(done);

        });
        it('should rename folder and delete all folders', function (done) {
            components.resources.page.renameItem(1, 'test-folder');

            expect(element.all(by.css('.name')).get(1).getText()).toBe('test-folder');

            components.resources.page.deleteItem(1);
            components.popovers.popover.clickYes();//click no btn
            expect(components.resources.page.countResources()).toBe(1);
            browser.sleep(200).then(done);
        });
    });

    describe('add file ', function () {
        it('should  add file', function (done) {
            components.layout.addSystemTestSupport();
            components.resources.page.openUploadFileDialog();
            expect(element(by.css('.modal-dialog')).isDisplayed()).toBe(true);

            components.resources.uploadFile.cancel(); // verify dialog is closed by clicking "open" again.
            expect(element(by.css('.modal-dialog')).isPresent()).toBe(false);
            components.resources.page.openUploadFileDialog();

            components.resources.uploadFile.uploadFile('foo');

            expect(components.resources.page.countResources()).toBe(2);
            expect(element.all(by.css('.name')).get(1).getText()).toBe('foo');
            browser.sleep(200).then(done);
        });
        it('should rename file', function (done) {
            components.resources.page.renameItem(1, 'test-file');
            expect(element.all(by.css('.name')).get(1).getText()).toBe('test-file');
            browser.sleep(200).then(done);
        });
        it('should delete file', function (done) {
            components.resources.page.deleteItem(1);
            components.popovers.popover.clickYes();//click no btn
            expect(components.resources.page.countResources()).toBe(1);

            browser.sleep(200).then(done);
        });
        it('should add multi files', function (done) {
            components.layout.addSystemTestSupport();
            components.resources.page.openUploadFileDialog();
            expect(element(by.css('.modal-dialog')).isDisplayed()).toBe(true);

            components.resources.uploadFile.uploadMultiFiles('foo', 'foo2');

            expect(components.resources.page.countResources()).toBe(3);
            expect(element.all(by.css('.name')).get(1).getText()).toBe('foo');
            expect(element.all(by.css('.name')).get(2).getText()).toBe('foo2');
            browser.sleep(200).then(done);
        });
        it('should not add folder if file was selected', function (done) {
            components.resources.page.selectFolder(1);
            components.resources.page.addFolder();

            expect(components.resources.page.countResources()).toBe(3);
            expect(element(by.css('.toast-error')).isDisplayed()).toBe(true);

            //delete all files
            components.resources.page.deleteItem(1);
            components.popovers.popover.clickYes();
            components.resources.page.deleteItem(1);
            components.popovers.popover.clickYes();
            browser.sleep(200).then(done);
        });

    });
    describe('plugin behavior', function () {
        it('should add plugin by https', function (done) {
            components.layout.goToDefinitions();
            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tested-plugin');
            components.modals.modal.enterUrl('https://github.com/cloudify-cosmo/cloudify-openstack-plugin/archive/master.zip');
            components.modals.modal.save();
            components.layout.goToResources();

            expect(element(by.cssContainingText('.name span', 'plugins')).isDisplayed()).toBe(true);//folder plugins should exist
            components.resources.page.openFolder(0);
            expect(element(by.cssContainingText('.name span', 'tested-plugin')).isDisplayed()).toBe(true);//folder with plugin name should exist

            browser.sleep(200).then(done);

        });
        it('should delete plugin on the resources page and definitions', function (done) {
            components.resources.page.deleteItem(2);
            components.popovers.popover.clickYes();//click no btn

            expect(element(by.cssContainingText('.name span', 'plugins')).isDisplayed()).toBe(true);//folder plugins should exist
            components.layout.goToDefinitions();
            expect(components.definitions.page.countPlugins()).toBe(0);//plugin should not exist
            components.layout.goToResources();
            browser.sleep(200).then(done);
        });
        it('should not show plugin after page refresh on the resources page and definitions', function (done) {
            browser.refresh();
            expect(element(by.cssContainingText('.name span', 'plugins')).isDisplayed()).toBe(true);//folder 'plugins' should exist
            expect(element(by.cssContainingText('.name span', 'tested-plugin')).isPresent()).toBe(false);//folder 'plugins' should be empty
            components.layout.goToDefinitions();
            expect(components.definitions.page.countPlugins()).toBe(0);//plugin should not exist
            components.layout.goToResources();
            browser.sleep(200).then(done);
        });
        it('should add plugin then remove plugins folder and all plugins should be deleted', function (done) {
            components.layout.goToDefinitions();
            //add two plugins
            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tested-plugin');
            components.modals.modal.enterUrl('https://github.com/cloudify-cosmo/cloudify-openstack-plugin/archive/master.zip');
            components.modals.modal.save();
            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tested-plugin2');
            components.modals.modal.enterUrl('https://github.com/cloudify-cosmo/cloudify-openstack-plugin/archive/master.zip');
            components.modals.modal.save();
            components.layout.goToResources();

            components.resources.page.deleteItem(1);//delete 'plugins' folder
            components.popovers.popover.clickYes();//click no btn

            //plugins should not exist on the definitions page and the resources page
            expect(element(by.cssContainingText('.name span', 'plugins')).isPresent()).toBe(false);//folder plugins should exist
            components.layout.goToDefinitions();
            expect(components.definitions.page.countPlugins()).toBe(0);//plugin should not exist
            components.layout.goToResources();


            browser.sleep(200).then(done);

        });
        it('should not show plugin after page refresh when delete plugins folder', function (done) {
            browser.refresh();
            expect(element(by.cssContainingText('.name span', 'plugins')).isPresent()).toBe(false);//folder 'plugins' should exist
            components.layout.goToDefinitions();
            expect(components.definitions.page.countPlugins()).toBe(0);//plugin should not exist
            components.layout.goToResources();
            browser.sleep(200).then(done);
        });
        it('should add multi files', function (done) {
            components.layout.addSystemTestSupport();
            components.resources.page.openUploadFileDialog();
            expect(element(by.css('.modal-dialog')).isDisplayed()).toBe(true);

            components.resources.uploadFile.uploadMultiFiles('foo', 'foo2');

            expect(components.resources.page.countResources()).toBe(3);
            expect(element.all(by.css('.name')).get(1).getText()).toBe('foo');
            expect(element.all(by.css('.name')).get(2).getText()).toBe('foo2');
            browser.sleep(200).then(done);
        });
        it('should not add folder if file was selected', function (done) {
            components.resources.page.selectFolder(1);
            components.resources.page.addFolder();

            expect(components.resources.page.countResources()).toBe(3);
            expect(element(by.css('.toast-error')).isDisplayed()).toBe(true);
            browser.sleep(200).then(done);
        });
    });
});
