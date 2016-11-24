'use strict';
var logger = browser.getLogger('plugins.spec');
var components = require('../../src/components');

describe('plugins section', function() {
    describe('login', function() {
        browser.get('/');
        components.login.loginDefault();
        // navigate to definitions tab
        browser.sleep(1000);
        logger.info('navigate to definitions tab');
        components.layout.goToDefinitions();
    });

    describe('UI interactions', function() {
        it('disabled save button, name field is required', function (done) {
            components.definitions.page.openUploadPluginDialog();
            expect(element(by.cssContainingText('.btn-primary', 'Save')).getAttribute('disabled')).toBe('true');//save btn should be disabled
            components.modals.modal.dismiss();
            browser.sleep(200).then(done);
        });
    });

    describe('add/remove plugin', function() {
        //won't work on phantomjs https://cloudifysource.atlassian.net/browse/COMPOSER-366
        /* jshint ignore:start */
        xit('should add plugin by file zip path', function (done) {
            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tested-plugin');

            var fileToUpload = '../../src/components/definitions/tested-plugin.zip',
                absolutePath = path.resolve(__dirname, fileToUpload);//get path to file
            components.modals.modal.enterFilePath(absolutePath);
            components.modals.modal.save();

            expect(components.definitions.page.countPlugins()).toBe(1);
            expect(components.definitions.page.getPluginInfo(0, 0)).toBe('tested-plugin'); //Check plugin name
            expect(components.definitions.page.getPluginInfo(0, 1)).toBe('tested-plugin');//Check plugin source

            browser.sleep(200).then(done);

        });
        xit('plugin folder should exist on the resources page after uncompress zip file', function (done) {
            components.layout.goToResources();
            expect(element(by.cssContainingText('.name span', 'plugins')).isDisplayed()).toBe(true);//folder plugins should exist
            components.resources.page.openFolder(0);
            expect(element(by.cssContainingText('.name span', 'tested-plugin')).isDisplayed()).toBe(true);//folder with plugin name should exist
            components.layout.goToDefinitions();

            browser.sleep(200).then(done);
        });
        xit('should add plugin by file tar path', function (done) {
            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tar-plugin');

            var fileToUpload = '../../src/components/definitions/tarFile.tar',
                absolutePath = path.resolve(__dirname, fileToUpload);//get path to file
            components.modals.modal.enterFilePath(absolutePath);
            components.modals.modal.save();

            expect(components.definitions.page.countPlugins()).toBe(2);
            expect(components.definitions.page.getPluginInfo(1, 0)).toBe('tar-plugin'); //Check plugin name
            expect(components.definitions.page.getPluginInfo(1, 1)).toBe('tar-plugin');//Check plugin source

            browser.sleep(200).then(done);
        });
        xit('plugin folder should exist on the resources page after uncompress tar file than remove it', function (done) {
            components.layout.goToResources();
            expect(element(by.cssContainingText('.name span', 'plugins')).isDisplayed()).toBe(true);//folder plugins should exist
            components.resources.page.openFolder(0);
            expect(element(by.cssContainingText('.name span', 'tar-plugin')).isDisplayed()).toBe(true);//folder with plugin name should exist
            components.layout.goToDefinitions();

            components.definitions.page.deletePlugins(1);//delete plugin
            expect(components.definitions.page.countPlugins()).toBe(1);

            browser.sleep(200).then(done);
        });
        xit('should add plugin by file tar.gz path and remove it', function (done) {
            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tarGz-plugin');
            var fileToUpload = '../../src/components/definitions/tarGzFile.tar.gz',
                absolutePath = path.resolve(__dirname, fileToUpload);//get path to file
            components.modals.modal.enterFilePath(absolutePath);
            components.modals.modal.save();

            expect(components.definitions.page.countPlugins()).toBe(2);
            expect(components.definitions.page.getPluginInfo(1, 0)).toBe('tarGz-plugin'); //Check plugin name
            expect(components.definitions.page.getPluginInfo(1, 1)).toBe('tarGz-plugin');//Check plugin source

            browser.sleep(200).then(done);
        });
        xit('plugin folder should exist on the resources page after uncompress tar.gz file than remove it', function (done) {
            components.layout.goToResources();
            expect(element(by.cssContainingText('.name span', 'plugins')).isDisplayed()).toBe(true);//folder plugins should exist
            components.resources.page.openFolder(0);
            expect(element(by.cssContainingText('.name span', 'tarGz-plugin')).isDisplayed()).toBe(true);//folder with plugin name should exist
            components.layout.goToDefinitions();

            components.definitions.page.deletePlugins(1);//delete plugin
            expect(components.definitions.page.countPlugins()).toBe(1);

            browser.sleep(200).then(done);
        });
        /* jshint ignore:end */

        it('should add plugin by https', function (done) {
            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tested-plugin-name');
            components.modals.modal.enterUrl('https://github.com/cloudify-cosmo/cloudify-openstack-plugin/archive/master.zip');
            components.modals.modal.save();
            expect(components.definitions.page.countPlugins()).toBe(1);
            components.definitions.page.deletePlugins(0);
            browser.sleep(200).then(done);
        });
        it('should add plugin by http', function (done) { //
            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tested-plugin-name2');
            components.modals.modal.enterUrl('http://github.com/cloudify-cosmo/cloudify-openstack-plugin/archive/master.zip');
            components.modals.modal.save();
            expect(components.definitions.page.countPlugins()).toBe(1);
            browser.sleep(200).then(done);
        });
        it('should not add plugin if it is not a zip file', function (done) {
            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('invalid-plugin-url');
            components.modals.modal.enterUrl('http://getcloudify.org.s3.amazonaws.com/spec/chef-plugin/1.3.1/plugin.yaml');
            components.modals.modal.save();

            expect(element(by.css('.modal-dialog')).isDisplayed()).toBe(true);
            expect(element(by.cssContainingText('.invalid', 'The URL is Invalid, Should end with zip / tar / tar.gz')).isDisplayed()).toBe(true);
            components.modals.modal.dismiss();

            expect(components.definitions.page.countPlugins()).toBe(1);
            components.definitions.page.deletePlugins(0);
            browser.sleep(200).then(done);
        });

        /**
         * See override issue COMPOSER-420 - https://cloudifysource.atlassian.net/browse/COMPOSER-420
         * there's no sense in adding the same plugin with the same name, this is a bug in the design.

        it('should allow overriding plagin', function (done) {
            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tested-plugin-name');
            components.modals.modal.enterUrl('http://github.com/cloudify-cosmo/cloudify-openstack-plugin/archive/master.zip');
            components.modals.modal.save();

            expect(components.definitions.page.countPlugins()).toBe(2); // override
            expect(components.definitions.page.getPluginInfo(1, 0)).toBe('tested-plugin-name'); //Check plugin name
            expect(components.definitions.page.getPluginInfo(0, 1)).toBe('tested-plugin-name');//Check plugin source

            browser.sleep(200).then(done);
        });

         */

        /**
         *  end of section - at this point the list of plugins is empty
         */
    });

    describe('rename plugin on the resources and definitions page (phantomjs)', function () {
        it('should rename plugin on the resources and definitions page', function (done) {
            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tested-plugin');
            components.modals.modal.enterUrl('https://github.com/cloudify-cosmo/cloudify-openstack-plugin/archive/master.zip');
            components.modals.modal.save();

            components.layout.goToResources();
            components.resources.page.openFolder(0);
            expect(element(by.cssContainingText('.name span', 'tested-plugin')).isDisplayed()).toBe(true);//folder with plugin name should exist
            components.resources.page.renameItem(2, 'newName');
            expect(element(by.cssContainingText('.name span', 'newName')).isDisplayed()).toBe(true);//folder was renamed
            components.layout.goToDefinitions();
            expect(components.definitions.page.getPluginInfo(0, 0)).toBe('newName'); //Check plugin name
            expect(components.definitions.page.getPluginInfo(0, 1)).toBe('newName'); //Check plugin source

            browser.sleep(200).then(done);
        });
        it('should show renamed plugin name after page was refreshed', function (done) {
            browser.driver.navigate().refresh();
            expect(components.definitions.page.getPluginInfo(0, 0)).toBe('newName'); //Check plugin name
            expect(components.definitions.page.getPluginInfo(0, 1)).toBe('newName'); //Check plugin source
            components.definitions.page.deletePlugins(0);

            browser.sleep(200).then(done);
        });

        /**
         *  end of section - at this point the list of plugins is empty
         */
    });

    describe('check plugin has operations', function() {
        it('plugin should exist in the operation list', function(done) {

            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tested-plugin');
            components.modals.modal.enterUrl('https://github.com/cloudify-cosmo/cloudify-openstack-plugin/archive/master.zip');
            components.modals.modal.save();

            components.definitions.page.pushNewTypeBtn();//open inlineType view
            components.definitions.types.setTypeName('inlineType');//set inlineType name

            if(browser.browserName === 'chrome'){
                components.definitions.types.clickOperation(0);//click inlineType operation - this won't work for phantom
            }
            else{
                components.definitions.types.mouseleaveOperation(0); //click inlineType operation - this will work for phantom
                browser.sleep(400);
            }
            components.definitions.page.openDefinitionsImplementationModalEditor();
            components.topology.page.selectSpecificImplementation('cinder_plugin.volume.create');
            components.modals.modal.done();//click done in editor modal

            components.definitions.types.clickEnterBtn();
            expect(element.all(by.repeater('item in interface.data track by $index')).get(0).all(by.css('.item-block')).get(1).getText()).toBe('tested-plugin.cinder_plugin.volume.create');
            components.definitions.types.closeType();//push cancel button

            components.definitions.page.deletePlugins(0);
            browser.sleep(200).then(done);

        });
    });
});

