'use strict';
var logger = require('log4js').getLogger('NodeTypes-e2e');
var components = require('../../src/components');

describe('plugins section', function() {

    beforeEach(function() {
        browser.get('/');

        components.login.login('user-' + new Date().getTime());
        // navigate to definitions tab
        browser.sleep(2000);
        logger.info('navigate to definitions tab');
    });

    describe('add nodeTyeps by url ', function() {
        it('should add nodeType by url', function(done) {

            components.types.menu.openAddNewStencilDialog();

            components.modals.modal.enterName('tested-stencil-openstack');
            components.modals.modal.enterUrl('http://getcloudify.org.s3.amazonaws.com/spec/openstack-plugin/1.3.1/plugin.yaml');
            components.modals.modal.cancel();

            browser.sleep(2000);

            components.types.menu.openAddNewStencilDialog();

            components.modals.modal.enterName('tested-stencil-openstack');
            components.modals.modal.enterUrl('http://getcloudify.org.s3.amazonaws.com/spec/openstack-plugin/1.3.1/plugin.yaml');
            components.modals.modal.save();

            browser.sleep(2000);

            components.types.menu.collapseAddedTyeps('cloudify.openstack.nodes'); // a way to verify that the relevant types were added to the stencils side menu

            browser.sleep(1000).then(done);


        });
    });


    afterEach(function() {
        components.layout.logout();
    });
});
