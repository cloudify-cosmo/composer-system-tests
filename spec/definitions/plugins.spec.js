/**
 * Created by liron on 9/6/15.
 */
'use strict';
//var fs = require('fs-extra');
var logger = require('log4js').getLogger('Plugins-e2e');
var components = require('../../src/components');

describe('plugins section', function() {

    beforeEach(function() {
        browser.get('/#/login');
        components.login.login('user-' + new Date().getTime());
        // navigate to definitions tab

        browser.sleep(2000);
        logger.info('navigate to definitions tab');
        components.layout.goToDefinitions();
    });

    describe('cancel to close modal', function() {
        it('cancel should close the modal ', function(done) {
            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tested-plugin');
            components.modals.modal.enterUrl('https://s3.amazonaws.com/cloudify-ui/test/cloudify-chef-plugin-1.3.1.zip');
            components.modals.modal.cancel();
            browser.sleep(1000).then(done);
        });
    });

    describe('add by url ', function() {
        it('should add plugin by url', function(done) {

            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tested-plugin1');
            components.modals.modal.enterUrl('https://s3.amazonaws.com/cloudify-ui/test/cloudify-chef-plugin-1.3.1.zip');
            components.modals.modal.save();

            browser.sleep(2000);
            browser.sleep(1000).then(done);


});
});

    describe('add by url - override', function() {

        it('should add the plugin twice using same url and name ', function(done) {

        browser.driver.manage().window().setSize(1600, 1000); // fixed: Failed: unknown error: Element is not clickable at point (1125, 29)

        components.definitions.page.openUploadPluginDialog();

        components.modals.modal.enterName('tested-plugin');
        components.modals.modal.enterUrl('https://s3.amazonaws.com/cloudify-ui/test/cloudify-chef-plugin-1.3.1.zip');
        components.modals.modal.save();

        browser.sleep(5000);

        // cause override btn to appear
        components.definitions.page.openUploadPluginDialog();

        components.modals.modal.enterName('tested-plugin');
        components.modals.modal.enterUrl('https://s3.amazonaws.com/cloudify-ui/test/cloudify-chef-plugin-1.3.1.zip');
        components.modals.modal.save();

        browser.sleep(2000);
        // choose to override
        components.definitions.page.override();

        browser.sleep(1000).then(done);


    });
});


//    describe('add by file ', function() {
//    it('should add file', function(done) {
//        components.definitions.page.openUploadPluginDialog();
//
//        components.modals.modal.enterName('tested-pluginByFile');
//
//        components.resources.uploadFile.uploadFile('foo');
//        browser.sleep(3000).then(done);
//
//
//    });
//});

});