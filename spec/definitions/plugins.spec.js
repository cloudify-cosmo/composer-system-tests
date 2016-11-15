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
            components.modals.modal.enterName('tested-plugin2');
            components.modals.modal.enterUrl('https://github.com/cloudify-cosmo/cloudify-openstack-plugin/archive/master.zip');
            components.modals.modal.save();
            expect(components.definitions.page.countPlugins()).toBe(1);
            browser.sleep(200).then(done);
        });
        it('should add plugin by http', function (done) { //
            components.definitions.page.deletePlugins(0);//delete tested-plugin2 plugin
            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tested-plugin2');
            components.modals.modal.enterUrl('http://github.com/cloudify-cosmo/cloudify-openstack-plugin/archive/master.zip');
            components.modals.modal.save();
            expect(components.definitions.page.countPlugins()).toBe(1);
            browser.sleep(200).then(done);
        });
        it('should not add plugin if it is not a zip file', function (done) {
            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tested-plugin2');

            components.modals.modal.enterUrl('http://getcloudify.org.s3.amazonaws.com/spec/chef-plugin/1.3.1/plugin.yaml');
            components.modals.modal.save();

            expect(element(by.css('.modal-dialog')).isDisplayed()).toBe(true);
            expect(element(by.cssContainingText('.invalid', 'The URL is Invalid, Should end with zip / tar / tar.gz')).isDisplayed()).toBe(true);
            expect(components.definitions.page.countPlugins()).toBe(1);

            components.modals.modal.cancel();

            browser.sleep(200).then(done);
        });
        it('should not allow to save plugin without name', function (done) {
            components.definitions.page.openUploadPluginDialog();
            expect($$('[ng-click="save($files)"]').get(0).getAttribute('disabled')).toBe('true');

            components.modals.modal.cancel();

            browser.sleep(200).then(done);
        });
        it('should add second plugin with the same name and source as in the first', function (done) {
            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tested-plugin2');

            components.modals.modal.enterUrl('https://github.com/cloudify-cosmo/cloudify-openstack-plugin/archive/master.zip');
            components.modals.modal.save();

            expect(components.definitions.page.countPlugins()).toBe(2);
            expect(components.definitions.page.getPluginInfo(1, 0)).toBe('tested-plugin2'); //Check plugin name
            expect(components.definitions.page.getPluginInfo(0, 1)).toBe('tested-plugin2');//Check plugin source

            browser.sleep(200).then(done);
        });
        it('should remove all plugins with the same name', function (done) {
            components.definitions.page.deletePlugins(1);//delete plugin
            expect(components.definitions.page.countPlugins()).toBe(1);
            browser.sleep(200).then(done);
        });
    });

    describe('rename plugin on the resources and definitions page (phantomjs)', function () {
        it('should rename plugin on the resources and definitions page', function (done) {
            // add the plugin again
            components.definitions.page.deletePlugins(0);//delete plugin
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
            browser.refresh();
            expect(components.definitions.page.getPluginInfo(0, 0)).toBe('newName'); //Check plugin name
            expect(components.definitions.page.getPluginInfo(0, 1)).toBe('newName'); //Check plugin source

            browser.sleep(200).then(done);
        });
    });

    describe('check plugin in operation', function() {
        it('custom plugin should not exist in the operation list', function(done) {
            //in order to make the test work needs to add an import first
            components.layout.goToImports();
            components.imports.page.openAddImportsDialog();
            components.modals.modal.enterUrl('http://getcloudify.org.s3.amazonaws.com/spec/chef-plugin/1.3.1/plugin.yaml', 'imports');
            components.modals.modal.save();

            components.layout.goToDefinitions();
            components.definitions.page.pushNewTypeBtn();//open inlineType view
            components.definitions.types.setTypeName('inlineType');//set inlineType name

            components.definitions.types.clickOperation(0);//click inlineType operation

            components.definitions.page.openDefinitionsImplementationModalEditor();
            components.topology.page.selectSpecificImplementation('chef.chef_plugin.operations.operation');
            components.modals.modal.done();//click done in editor modal

            components.definitions.types.clickEnterBtn();
            expect(element.all(by.repeater('item in interface.data track by $index')).get(0).all(by.css('.item-block')).get(1).getText()).toBe('aws.ec2.elasticip.creation_validation');
            components.definitions.types.closeType();//push cancel button
            browser.sleep(200).then(done);
        });

        it('custom plugin should exist in the operation list', function(done) {

            components.definitions.page.openUploadPluginDialog();
            components.modals.modal.enterName('tested-plugin');
            components.modals.modal.enterUrl('https://github.com/cloudify-cosmo/cloudify-openstack-plugin/archive/master.zip');
            components.modals.modal.save();

            components.definitions.page.pushNewTypeBtn();//open inlineType view
            components.definitions.types.setTypeName('inlineType');//set inlineType name

            components.definitions.types.clickOperation(0);//click inlineType operation

            components.definitions.page.openDefinitionsImplementationModalEditor();
            components.topology.page.selectSpecificImplementation('ec2.elasticip.creation_validation');
            components.modals.modal.done();//click done in editor modal

            components.definitions.types.clickEnterBtn();
            expect(element.all(by.repeater('item in interface.data track by $index')).get(0).all(by.css('.item-block')).get(1).getText()).toBe('tested-plugin.ec2.elasticip.creation_validation');
            components.definitions.types.closeType();//push cancel button

            browser.sleep(200).then(done);

        });
    });
});

