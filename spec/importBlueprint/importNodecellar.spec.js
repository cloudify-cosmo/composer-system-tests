'use strict';

var logger = browser.getLogger('importNodecellar.spec');
const components = require('../../src/components');

describe('importBlueprint section', function() {
    beforeAll(function() {
        logger.info('import nodecellar spec');
    });

    describe('login', function() {
        it('should log in', function(done) {
            browser.get('/');
            browser.sleep(2000);
            components.login.login('user-' + (new Date().getTime()));
            browser.sleep(2000).then(done);
        });
    });

    describe('nodecellar blueprint', function() {
        beforeEach(function(done) {
            components.layout.goToTopology();
            browser.sleep(2000).then(done);
        });
        it('should import nodecellar blueprint', function(done) {
            var nodes = by.css('.nodeContainer');

            components.importBlueprint.page.openImportModal();
            components.modals.modal.enterName('nodecellar');
            components.modals.modal.enterUrl('https://github.com/cloudify-cosmo/composer-system-tests/blob/master/src/components/importBlueprint/nodecellar.tar.gz?raw=true');
            components.modals.modal.save();

            browser.wait(function() { return browser.isElementPresent(nodes); }, 10000);

            expect(element.all(nodes).count()).toBe(4);
            expect(element.all(by.css('.connectorLine')).count()).toBe(1);
            expect(element(by.css('.headTitle')).getText()).toBe('nodecellar');
            browser.sleep(200).then(done);
        });
        it('filled properties should exist in the host node', function(done) {
            components.topology.page.openNode(0);
            expect(element(by.css('.nodeName')).getText()).toBe('host');
            expect(element(by.css('.install_agent')).getAttribute('value')).toBe('false');
            expect(element(by.css('.ip')).getAttribute('value')).toBe('{get_input: host_ip}');
            components.topology.page.closeNode();
            browser.sleep(200).then(done);
        });
        it('input and output should exist', function(done) {
            components.layout.goToInputsOutputs();
            expect(components.inputsOutputs.page.countInputsOrOutputs(element(by.css('.blueprint-inputs')))).toBe(1);
            expect(components.inputsOutputs.page.countInputsOrOutputs(element(by.css('.blueprint-outputs')))).toBe(1);
            browser.sleep(200).then(done);
        });
        it('should check nodecellar relationships', function(done) {
            components.topology.page.openConnector(0);
            expect(element.all(by.css('.listInput input')).get(0).getAttribute('value')).toBe('node_connected_to_mongo');
            components.topology.page.closeNode();

            components.topology.page.openNode(3);
            expect(element(by.css('.nodeName')).getText()).toBe('nodecellar');

            components.topology.page.openNodeSection(1);
            components.topology.page.selectContainedInConnection();
            expect(element.all(by.css('.listInput input')).get(1).getAttribute('value')).toBe('node_contained_in_nodejs');

            components.topology.page.closeNode();
            browser.sleep(200).then(done);
        });
    });
});