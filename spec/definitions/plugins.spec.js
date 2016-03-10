/**
 * Created by liron on 9/6/15.
 */
'use strict';
var fs = require('fs-extra');
var logger = browser.getLogger('plugins.spec');
var _ = require('lodash');
var components = require('../../src/components');

describe('plugins section', function() {
    beforeEach(function() {
        logger.info('loading page');
        browser.get('/');

        components.login.login('user-' + new Date().getTime());
        // navigate to definitions tab
        browser.sleep(2000);
        logger.info('navigate to definitions tab');
        components.layout.goToDefinitions();
    });

    describe('add by url ', function() {
        it('should add plugin by url', function(done) {

            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tested-plugin');
            components.modals.modal.enterUrl('http://getcloudify.org.s3.amazonaws.com/spec/chef-plugin/1.3.1/plugin.yaml');
            components.modals.modal.save();

            browser.sleep(1000);

            $$('.definition-block').filter((elem, index)=>{
                return elem.getText().then((text)=>{
                    console.log('plugin name is: ' + text);
            if(text==='chef'){
                console.log('cheffff: ' + text);

            }
            return text === 'Name';
        })
    });



    // components.definitions.page.getPluginName();

    browser.sleep(1000).then(done);


});
});

//components.resources.uploadFile.uploadFile('foo');

xdescribe('add by url - override', function() {
    it('should add the plugin twice using same url and name ', function(done) {

        components.definitions.page.openUploadPluginDialog();

        components.modals.modal.enterName('tested-plugin');
        components.modals.modal.enterUrl('http://getcloudify.org.s3.amazonaws.com/spec/chef-plugin/1.3.1/plugin.yaml');
        components.modals.modal.cancel();

        browser.sleep(1000);

        components.definitions.page.openUploadPluginDialog();

        components.modals.modal.enterName('tested-plugin');
        components.modals.modal.enterUrl('http://getcloudify.org.s3.amazonaws.com/spec/chef-plugin/1.3.1/plugin.yaml');
        components.modals.modal.save();

        browser.sleep(5000);

        // cause override btn to appear
        components.definitions.page.openUploadPluginDialog();

        components.modals.modal.enterName('tested-plugin');
        components.modals.modal.enterUrl('http://getcloudify.org.s3.amazonaws.com/spec/chef-plugin/1.3.1/plugin.yaml');
        components.modals.modal.save();

        browser.sleep(1000);
        // choose to override
        components.definitions.page.override();

        browser.sleep(1000).then(done);


    });
});


xdescribe('add by file ', function() {
    it('should add file', function(done) {
        components.definitions.page.openUploadPluginDialog();

        components.modals.modal.enterName('tested-pluginByFile');

        browser.pause();
        components.resources.uploadFile.uploadFile('foo');
        browser.sleep(3000).then(done);


    });
});


//describe('override uploaded yaml file ', function() {
//    it('should ask to override uploaded yaml file', function(done) {
//        //components.resources.page.addFolder();
//        //components.resources.page.rename('new folder 0', 'test-file');
//        //browser.sleep(1000);
//        //components.resources.page.addFolder();
//        //expect(components.resources.page.countResources()).toBe(3);
//        //browser.sleep(2000).then(done);
//
//    });
//});
//
//describe('upload zip ', function() {
//    // not sure it's possible to test an actual file addition
//    it('should  upload zip', function(done) {
//        //components.resources.page.addSystemTestSupport();
//        //// open add file modal
//        //components.resources.page.openUploadFileDialog();
//        //
//        //components.resources.uploadFile.cancel(); // verify dialog is closed by clicking "open" again.
//        //components.resources.page.openUploadFileDialog();
//        //
//        //components.resources.uploadFile.uploadFile('foo');
//        //browser.sleep(2000).then(done);
//    });
//});
//
//describe('override uploaded zip ', function() {
//    it('should ask to override uploaded zip', function(done) {
//        //components.resources.page.addFolder();
//        //components.resources.page.rename('new folder 0', 'test-folder');
//        //
//        //browser.sleep(1000).then(done);
//    });
//});
//
//describe('add by yaml file url ', function() {
//    it('should add plugin by yaml file url', function(done) {
//        //components.resources.page.addSystemTestSupport();
//        //// open add file modal
//        //components.resources.page.openUploadFileDialog();
//        //
//        //components.resources.uploadFile.cancel(); // verify dialog is closed by clicking "open" again.
//        //components.resources.page.openUploadFileDialog();
//        //
//        //components.resources.uploadFile.uploadFile('foo');
//        //browser.sleep(2000);
//        //components.resources.page.rename('foo', 'test-file');
//        //
//        //browser.sleep(1000).then(done);
//    });
//});



//afterEach(function() {
//    components.layout.logout();
//});
});