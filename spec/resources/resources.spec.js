/**
 * Created by liron on 9/6/15.
 */
'use strict';
var fs = require('fs-extra');
var logger = require('log4js').getLogger('Resources-e2e');
var _ = require('lodash');
var components = require('../../src/components');

describe('resources page', function() {

    beforeEach(function() {
        browser.get('/');

        components.login.login('user-' + new Date().getTime());
        // navigate to resource tab
        browser.sleep(2000);
        components.layout.goToResources();
    });

    describe('add folder', function() {
        it('should add folder', function(done) {
            // click add folder
            components.resources.page.addFolder();
            expect(components.resources.page.countResources()).toBe(1);
            browser.sleep(1000).then(done);

        });
    });

    describe('add folder in a folder', function() {
        it('should add folder in a current folder', function(done) {
            components.resources.page.addFolder();
            components.resources.page.rename('new folder 0', 'test-file');
            browser.sleep(1000);
            components.resources.page.addFolder();
            expect(components.resources.page.countResources()).toBe(3);
            browser.sleep(2000).then(done);

        });
    });

    describe('add file ', function() {
        // not sure it's possible to test an actual file addition
        it('should  add file', function(done) {
            components.resources.page.addSystemTestSupport();
            // open add file modal
            components.resources.page.openUploadFileDialog();

            components.resources.uploadFile.cancel(); // verify dialog is closed by clicking "open" again.
            components.resources.page.openUploadFileDialog();

            components.resources.uploadFile.uploadFile('foo');
            browser.sleep(2000).then(done);
        });
    });

    describe('rename folder ', function() {
        it('should rename folder', function(done) {
            components.resources.page.addFolder();
            components.resources.page.rename('new folder 0', 'test-folder');

            browser.sleep(1000).then(done);
        });
    });

    describe('rename file ', function() {
        it('should rename file', function(done) {
            components.resources.page.addSystemTestSupport();
            // open add file modal
            components.resources.page.openUploadFileDialog();

            components.resources.uploadFile.cancel(); // verify dialog is closed by clicking "open" again.
            components.resources.page.openUploadFileDialog();

            components.resources.uploadFile.uploadFile('foo');
            browser.sleep(2000);
            components.resources.page.rename('foo', 'test-file');

            browser.sleep(1000).then(done);
        });
    });

    describe('delete folder ', function() {
        it('should delete folder', function(done) {
            components.resources.page.addFolder();
            components.resources.page.delete('new folder 0');
            browser.sleep(1000);
            components.resources.page.acceptDialog();

            expect(components.resources.page.countResources()).toBe(0);

            // browser.pause();
            browser.sleep(1000).then(done);
        });
    });


    afterEach(function() {
        components.layout.logout();
    });
});
