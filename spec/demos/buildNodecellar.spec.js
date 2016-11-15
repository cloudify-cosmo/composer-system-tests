'use strict';

const components = require('../../src/components');

describe('Nodecellar', () => {

  it('should login', () => {

    browser.get('/');
    components.login.loginDefault();
  });

  it('should import nodecellar types', (done) => {
    const TYPES_URL = 'https://raw.githubusercontent.com/cloudify-cosmo/cloudify-nodecellar-example/master/types/nodecellar.yaml';
    // open new stencil dialog
    components.imports.page.openAddImportsDialog();
    // type in the nodecellar types url
    components.modals.modal.enterUrl(TYPES_URL, 'imports');
    // save stencil
    components.modals.modal.save();
    components.layout.goToTopology();

    browser.sleep(1000).then(done);
  });

  it('should add node templates to blueprint and rename it', (done) => {
    components.topology.inject();
    browser.sleep(1000);

    // there is strange bug with clone() method
    // so if we want to save node in variable we should sent node number as second argument
    let host = components.topology.page.createNode('Compute', 0);

    expect(element.all(by.css('.nodeContainer')).count()).toBe(1);
    components.topology.page.openNode(0);
    components.topology.page.renameNodeName('host').sendKeys(protractor.Key.ENTER);
    expect(element(by.css('.nodeName')).getText()).toBe('host');
    components.topology.page.closeNode(0);

    let mongod = components.topology.page.createNode('MongoDatabase', 1, host); // jshint ignore:line
    expect(element.all(by.css('.nodeContainer')).count()).toBe(2);
    components.topology.page.openNode(1);
    components.topology.page.renameNodeName('mongod').sendKeys(protractor.Key.ENTER);
    expect(element(by.css('.nodeName')).getText()).toBe('mongod');
    components.topology.page.closeNode(1);

    let nodejs = components.topology.page.createNode('NodeJSServer', 2, host);
    expect(element.all(by.css('.nodeContainer')).count()).toBe(3);
    components.topology.page.openNode(2);
    components.topology.page.renameNodeName('nodejs').sendKeys(protractor.Key.ENTER);
    expect(element(by.css('.nodeName')).getText()).toBe('nodejs');
    components.topology.page.closeNode(2);

    let nodecellar = components.topology.page.createNode('NodecellarApplicationModule', 3, nodejs); // jshint ignore:line
    expect(element.all(by.css('.nodeContainer')).count()).toBe(4);
    components.topology.page.openNode(3);
    components.topology.page.renameNodeName('nodecellar').sendKeys(protractor.Key.ENTER);
    expect(element(by.css('.nodeName')).getText()).toBe('nodecellar');
    components.topology.page.closeNode(3);

    browser.sleep(1000).then(done);
  });

  it('should add connector', (done) => {
    components.topology.page.drawConnectorLine(element.all(by.css('.nodeContainer')).get(3), element.all(by.css('.nodeContainer')).get(1));
    expect(element.all(by.css('.connectorLine')).count()).toBe(1);

    browser.sleep(200).then(done);
  });
  it('should add input and output', (done) => {
    components.layout.goToInputsOutputs();
    components.inputsOutputs.page.setInput('host_ip', '', 'localhost'); //fill fields
    components.inputsOutputs.page.submitInputOrOutput(element(by.css('.blueprint-inputs'))); //submit
    expect(components.inputsOutputs.page.countInputsOrOutputs(element(by.css('.blueprint-inputs')))).toBe(1); //input should exist

    components.inputsOutputs.page.setOutput('endpoint', 'Web application endpoint', {
      ip_address: 'localhost',
      port: '{ get_property: [nodecellar, port] }'
    }); //fill fields
    components.inputsOutputs.page.submitInputOrOutput(element(by.css('.blueprint-outputs'))); //submit
    expect(components.inputsOutputs.page.countInputsOrOutputs(element(by.css('.blueprint-outputs')))).toBe(1); //output should exist
    components.layout.goToTopology();
    browser.sleep(200).then(done);
  });
  it('should set host properties', (done) => {
    components.topology.page.openNode(0);

    element(by.css('.install_agent')).clear().sendKeys('false');
    element(by.css('.ip')).clear().sendKeys('{ "get_input": "host_ip" }');

    expect(element(by.css('.install_agent')).getAttribute('value')).toBe('false');
    expect(element(by.css('.ip')).getAttribute('value')).toBe('{ "get_input": "host_ip" }');

    components.topology.page.closeNode(0);
    browser.sleep(200).then(done);
  });
  it('should change connector type', (done) => {
    components.topology.page.openConnector(0);
    components.topology.page.changeConnectorType(0, 'node_connected_to_mongo');

    expect(element.all(by.css('.listInput input')).get(0).getAttribute('value')).toBe('node_connected_to_mongo');
    browser.sleep(200).then(done);
  });
  it('should change relationship type', (done) => {
    components.topology.page.openNode(3);
    components.topology.page.openNodeSection(1);
    components.topology.page.selectContainedInConnection();

    components.topology.page.changeConnectorType(0, 'node_contained_in_nodejs');

    expect(element.all(by.css('.listInput input')).get(1).getAttribute('value')).toBe('node_contained_in_nodejs');
    components.topology.page.closeNode(0);
    browser.sleep(200).then(done);
  });

  it('should save blueprint', () => {
    components.layout.saveBlueprint();
    browser.refresh();
    // see that all nodes are available
    expect(element.all(by.css('.nodeContainer')).count()).toBe(4);
  });

});