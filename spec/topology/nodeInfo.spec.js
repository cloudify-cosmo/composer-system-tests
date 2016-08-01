'use strict';
var components = require('../../src/components');

describe('topology page', function() {

  describe('login',function() {
    browser.get('/');

    components.login.login('user-' + new Date().getTime());
    // navigate to inputs outputs tab
    browser.sleep(2000);
  });


  describe('add and save node', function() {
    it('should add save node', function(done) {

      //add node on topology page
      var dragItem = components.topology.page.findSpecificNodeContainerOnTopologyPage('cloudify.docker', 'Container');
      var dragDest = {x:305,y:-135};

      components.layout.dragAndDrop(dragItem, dragDest);//add node
      expect(element.all(by.css('.nodeContainer')).count()).toBe(1);

      components.layout.saveBlueprint();//save node
      browser.refresh();

      expect(element.all(by.css('.nodeContainer')).count()).toBe(1);

      browser.sleep(200).then(done);
    });
  });

  describe('node rename and instances', function() {
    it('should not rename node', function(done) {
      components.topology.page.openNode(0);

      components.topology.page.renameNodeName('New_node_name');
      browser.actions().mouseMove({x: 400, y: 0}).click().perform();//rename but don't push enter

      expect(element(by.css('.nodeName')).getText()).toBe('New_Container_1');//node has not been renamed

      browser.sleep(200).then(done);
    });

    it('should rename node', function(done) {
      components.topology.page.openNode(0);

      components.topology.page.renameNodeName('New_node_name').sendKeys(protractor.Key.ENTER);//rename and push enter

      expect(element(by.css('.nodeName')).getText()).toBe('New_node_name');//node has been renamed

      browser.sleep(200).then(done);
    });
    it('should set instance number', function(done) {

      components.topology.page.setInstances(5);
      components.topology.page.closeNode();

      //expect(element(by.css('.plannedInstances')).getText()).toBe('5');//instance has been set

      browser.sleep(2000).then(done);
    });
    it('should remove instance number', function(done) {
      components.topology.page.openNode(0);
      components.topology.page.removeInstances();
      components.topology.page.closeNode();

      expect(element(by.css('.plannedInstances')).getText()).toBe('');//instance has been removed

      browser.sleep(2000).then(done);
    });
    it('should not set any letters in instance field', function(done) {
      components.topology.page.openNode(0);
      components.topology.page.setInstances('some test');
      components.topology.page.closeNode();

      expect(element(by.css('.plannedInstances')).getText()).toBe('');//letters have not set in instance field
      browser.sleep(200).then(done);
    });
  });

  describe('node properties', function() {
    it('properties for node docker should exist', function(done) {

      components.topology.page.openNode(0);
      expect(element.all(by.css('.propsContainer .propData')).count()).toBe(3);

      components.topology.page.closeNode();

      browser.sleep(200).then(done);
    });
    it('should change property value and save it', function(done) {

      components.topology.page.openNode(0);
      components.topology.page.setPropertyValue('{"get_input":"name"}');

      expect(element.all(by.css('.propsContainer .propData')).get(0).getAttribute('value')).toBe('{"get_input":"name"}');//text should exist

      components.topology.page.closeNode();
      components.layout.saveBlueprint();//save node
      browser.refresh();

      components.topology.page.openNode(0);
      expect(element(by.css('.nodeName')).getText()).toBe('New_node_name');//node name is not changed after saving
      expect(element.all(by.css('.propsContainer .propData')).get(0).getAttribute('value')).toBe('{"get_input":"name"}');//text should exist after save blueprint and page refresh
      components.topology.page.closeNode();

      browser.sleep(200).then(done);
    });

    it('should not change property value using modal editor', function(done) {

      components.topology.page.openNode(0);
      components.topology.page.openPropertyModalEditor();

      expect(components.layout.isElementDisplayed(element(by.css('.modal.fade.in')))).toBe(true);//modal should appear


      components.modals.modal.selectEditorField();
      components.modals.modal.renameValueInEditor('"new editor value"');
      components.modals.modal.cancelUsingSelector();//click cancel in editor modal

      expect(element.all(by.css('.propsContainer .propData')).get(0).getAttribute('value')).toBe('{"get_input":"name"}');//text should exist after save modal editor
      browser.sleep(200).then(done);
    });

    it('should change property value using modal editor', function(done) {

      components.topology.page.openPropertyModalEditor();

      expect(components.layout.isElementDisplayed(element(by.css('.modal.fade.in')))).toBe(true);//modal should appear


      components.modals.modal.selectEditorField();
      components.modals.modal.renameValueInEditor('"new editor value"');
      components.modals.modal.done();//click done in editor modal

      expect(element.all(by.css('.propsContainer .propData')).get(0).getAttribute('value')).toBe('new editor value');//text should exist after save modal editor

      console.log(10);

      browser.sleep(200).then(done);
    });

    it('should copy default value in modal editor', function(done) {

      components.topology.page.openPropertyModalEditor();

      expect(components.layout.isElementDisplayed(element(by.css('.modal.fade.in')))).toBe(true);//modal should appear

      components.modals.modal.copyToEditor();
      components.modals.modal.done();//click done in editor modal

      expect(element.all(by.css('.propsContainer .propData')).get(0).getAttribute('value')).toBe('{}');//default value
      components.topology.page.closeNode();
      browser.sleep(200).then(done);
    });
  });
  describe('node interfaces', function() {
    it('interfaces for node docker should exist', function(done) {

      components.topology.page.openNode(0);
      components.topology.page.openNodeSection(0);

      expect(element.all(by.css('.interfacesContainer input')).count()).toBe(9);

      components.topology.page.closeNode();

      browser.sleep(200).then(done);
    });
    it('should add custom interface input', function(done) {

      components.topology.page.openNode(0);
      components.topology.page.openNodeSection(0);

      expect(element.all(by.repeater('(method , methodData) in interfaceData')).get(0).all(by.css('.inputItem')).count()).toBe(0);

      components.topology.page.addCustomInterfaceInput();

      expect(element.all(by.repeater('(method , methodData) in interfaceData')).get(0).all(by.css('.inputItem')).count()).toBe(1);


      browser.sleep(200).then(done);
    });
    it('should remove custom interface input', function(done) {

      components.topology.page.openNodeSection(0);

      expect(element.all(by.repeater('(method , methodData) in interfaceData')).get(0).all(by.css('.inputItem')).count()).toBe(1);

      components.topology.page.removeCustomInterfaceInput();
      expect(components.layout.isElementDisplayed(element(by.css('.popover')))).toBe(true);//popover should show up
      components.popovers.popover.clickYes();//click yes btn
      expect(components.layout.isElementPresent(element(by.css('.popover')))).toBe(false);//popover should be hide

      expect(element.all(by.repeater('(method , methodData) in interfaceData')).get(0).all(by.css('.inputItem')).count()).toBe(0);//custom input should not exist

      browser.sleep(200).then(done);
    });
    it('should set implementation value using input field', function(done) {

      components.topology.page.changeImplementationName('docker.docker_plugin.tasks.create_container');
      expect(element.all(by.repeater('(method , methodData) in interfaceData')).get(0).all(by.css('.inputItem')).count()).toBe(2);

      expect(element.all(by.css('.implementationInput')).get(0).getAttribute('value')).toBe('docker.docker_plugin.tasks.create_container');

      browser.sleep(200).then(done);
    });
    it('should remove default inputs but custom inputs should not remove when change implementation value', function(done) {

      components.topology.page.addCustomInterfaceInput();
      components.topology.page.changeImplementationName('some value');
      expect(element.all(by.repeater('(method , methodData) in interfaceData')).get(0).all(by.css('.inputItem')).count()).toBe(1);

      components.topology.page.removeCustomInterfaceInput();
      components.popovers.popover.clickYes();//click yes btn

      browser.sleep(200).then(done);
    });
    it('should set implementation value using modal editor', function(done) {//TODO uncomment after CFY-5113 will be merged

      components.topology.page.openImplementationModalEditor();

      expect(components.layout.isElementDisplayed(element(by.css('.modal.fade.in')))).toBe(true);//modal should appear

      components.topology.page.selectSpecificImplementation('docker_plugin.tasks.create_container');
      components.modals.modal.done();//click done in editor modal

      expect(element.all(by.repeater('(method , methodData) in interfaceData')).get(0).all(by.css('.inputItem')).count()).toBe(2);

      browser.sleep(200).then(done);
    });
    it('should not set implementation value using modal editor', function(done) {

      components.topology.page.openImplementationModalEditor();

      expect(components.layout.isElementDisplayed(element(by.css('.modal.fade.in')))).toBe(true);//modal should appear

      components.topology.page.selectSpecificImplementation('cloudify_hostpool_plugin.tasks.acquire');
      components.modals.modal.cancelUsingSelector();//click cancel in editor modal

      expect(element.all(by.repeater('(method , methodData) in interfaceData')).get(0).all(by.css('.inputItem')).count()).toBe(2);
      expect(element.all(by.css('.implementationInput')).get(0).getAttribute('value')).toBe('docker.docker_plugin.tasks.create_container');
      components.topology.page.closeNode();
      browser.sleep(200).then(done);
    });
  });

  describe('node relationships', function() {
    it('should add second node', function(done) {
      //add node on topology page
      var dragItem = components.topology.page.findSpecificNodeContainerOnTopologyPage('cloudify.docker', 'Container');
      var dragDest = {x:605,y:-135};

      components.layout.dragAndDrop(dragItem, dragDest);//add node
      expect(element.all(by.css('.nodeContainer')).count()).toBe(2);

      components.layout.saveBlueprint();//save node
      browser.refresh();

      expect(element.all(by.css('.nodeContainer')).count()).toBe(2);

      browser.sleep(200).then(done);

    });
    it('should create node connector', function(done) {

      //add node on topology page
      components.topology.page.drawConnectorLine(element.all(by.css('.nodeContainer')).get(0), element.all(by.css('.nodeContainer')).get(1));
      expect(element.all(by.css('.connectorLine')).count()).toBe(1);
      console.log(20);
      browser.sleep(200).then(done);

    });
    it('should open node connector', function(done) {
      components.topology.page.openConnector(0);
      expect(element(by.css('.nodeName')).getText()).toBe('New_Connector_2');
      browser.sleep(200).then(done);

    });
    it('connector relationships tab should not be empty ', function(done) {//check connector relationships
      components.topology.page.openConnectorRelationshipSection();
      expect(element.all(by.css('.relItem')).count()).toBe(2);
      expect(element.all(by.css('.relItem')).get(0).getText()).toBe('New_node_name');
      expect(element.all(by.css('.relItem')).get(1).getText()).toBe('New_Container_1');
      components.topology.page.closeNode();
      browser.sleep(200).then(done);

    });
    it('should have Outgoing relationship', function(done) {//check New_Container_1 relationships
      components.topology.page.openNode(1);
      components.topology.page.openNodeSection(1);
      expect(element.all(by.css('.rel-right .target')).count()).toBe(2);
      expect(element.all(by.css('.rel-right .target')).get(0).getText()).toBe('New_Container_1');
      expect(element.all(by.css('.rel-right .relType')).get(0).getText()).toBe('cloudify.relationships.connected_to');
      components.topology.page.closeNode();
      browser.sleep(200).then(done);

    });
    it('should have incoming relationship', function(done) {//check New_Container_2 relationships
      components.topology.page.openNode(0);
      components.topology.page.openNodeSection(1);
      expect(element.all(by.css('.rel-left .target')).count()).toBe(2);
      expect(element.all(by.css('.rel-left .target')).get(0).getText()).toBe('New_node_name');
      expect(element.all(by.css('.rel-left .relType')).get(0).getText()).toBe('cloudify.relationships.connected_to');
      components.topology.page.closeNode();
      browser.sleep(200).then(done);

    });
  });

  describe('remove node', function() {
    it('should remove  node', function(done) {
      components.topology.page.openNode(1);
      components.topology.page.deleteNode();
      expect(components.layout.isElementDisplayed(element(by.css('.popover')))).toBe(true);//popover should show up
      components.popovers.popover.clickYes();//click yes btn

      components.topology.page.openNode(0);
      components.topology.page.deleteNode();
      expect(components.layout.isElementDisplayed(element(by.css('.popover')))).toBe(true);//popover should show up
      components.popovers.popover.clickYes();//click yes btn

      expect(element.all(by.css('.nodeContainer')).count()).toBe(0);
      browser.sleep(200).then(done);
    });
  });

  describe('node network', function() {
    it('should add Compute node', function(done) {

      //add node on topology page
      var dragItem = components.topology.page.findSpecificNodeContainerOnTopologyPage('cloudify.nodes', 'Compute');
      var dragDest = {x:200,y:-520};

      components.layout.dragAndDrop(dragItem, dragDest);//add node
      expect(element.all(by.css('.nodeContainer')).count()).toBe(1);

      browser.sleep(200).then(done);
    });
    it('should add Security Group node', function(done) {

      //add node on topology page
      var dragItem = components.topology.page.findSpecificNodeContainerOnTopologyPage('cloudify.nodes', 'SecurityGroup');
      var dragDest = {x:300,y:-130};

      components.layout.dragAndDrop(dragItem, dragDest);//add node
      expect(element.all(by.css('.nodeContainer')).count()).toBe(2);

      browser.sleep(200).then(done);
    });
    it('should add Virtual Ip node', function(done) {

      //add node on topology page
      var dragItem = components.topology.page.findSpecificNodeContainerOnTopologyPage('cloudify.nodes', 'VirtualIP');
      var dragDest = {x:305,y:-135};

      components.layout.dragAndDrop(dragItem, dragDest);//add node
      expect(element.all(by.css('.nodeContainer')).count()).toBe(3);

      browser.sleep(200).then(done);
    });
    it('should not add Security Group to compute node network', function(done) {

      components.topology.page.openNode(0);
      components.topology.page.openNetworkSection();
      components.topology.page.pushAddSecurityGroupBtn();

      expect(components.layout.isElementDisplayed(element.all(by.css('.add-security-group-section')).get(1))).toBe(true);//show Security Group drop down
      expect(element.all(by.css('.securityGroupDropdown .securityGroup')).get(0).getAttribute('value')).toBe('New_SecurityGroup_4');//Security Group value

      components.topology.page.pushCancelEditBtn(1);

      expect(components.layout.isElementDisplayed(element.all(by.css('.securityGroupsList')).get(0))).toBe(false);//hide Security Group list

      browser.sleep(200).then(done);
    });
    it('should add Security Group to compute node network', function(done) {

      components.topology.page.pushAddSecurityGroupBtn();

      components.topology.page.pushAddEditBtn(0);

      expect(components.layout.isElementDisplayed(element.all(by.css('.securityGroupsList')).get(0))).toBe(true);//show Security Group list
      expect(element.all(by.css('.securityGroupsList')).get(0).all(by.css('li')).count()).toBe(1);//Security Group has been added
      console.log(30);
      browser.sleep(200).then(done);
    });
    it('should not add Security Group with the same name', function(done) {

      components.topology.page.pushAddEditBtn(0);

      expect(components.layout.isElementPresent(element.all(by.css('.add-security-group-section .addError')).get(0))).toBe(true);//Security Group added error
      expect(element.all(by.css('.securityGroupsList')).get(0).all(by.css('li')).count()).toBe(1);//should not add Security Group to list

      components.topology.page.pushCancelEditBtn(1);

      browser.sleep(200).then(done);
    });
    it('should remove Security Group', function(done) {

      components.topology.page.pushVirtualIpBtn();

      components.topology.page.pushRemoveSecurityGroupBtn();

      expect(element.all(by.repeater('securityGroup in getGroups(consts.SecurityGroupType)')).count()).toBe(0);//Security Group has been deleted

      browser.sleep(200).then(done);
    });

    it('should add Virtual Ip to compute node network', function(done) {

      components.topology.page.pushAddEditBtn(1);

      expect(components.layout.isElementDisplayed(element.all(by.css('.add-security-group-section')).get(3))).toBe(true);//show Virtual Ip drop down
      expect(element.all(by.css('.securityGroupDropdown .virtualIp')).get(0).getAttribute('value')).toBe('New_VirtualIP_5');//Virtual Ip value

      components.topology.page.pushCancelEditBtn(3);

      expect(element.all(by.repeater('virtualIp in getGroups(consts.VirtualIpType)')).count()).toBe(1);//Virtual Ip list has been added

      browser.sleep(200).then(done);
    });
    it('should not add Virtual Ip to compute node network', function(done) {

      components.topology.page.pushVirtualIpBtn();

      components.topology.page.pushAddEditBtn(1);

      expect(components.layout.isElementDisplayed(element.all(by.css('.securityGroupsList')).get(1))).toBe(true);//show Virtual Ip list
      expect(element.all(by.repeater('virtualIp in getGroups(consts.VirtualIpType)')).count()).toBe(1);//Virtual Ip has been added

      browser.sleep(200).then(done);
    });
    it('should not add Virtual Ip with the same name', function(done) {

      components.topology.page.pushAddEditBtn(1);

      expect(components.layout.isElementPresent(element.all(by.css('.add-security-group-section .addError')).get(1))).toBe(true);//Virtual Ip added error
      expect(element.all(by.css('.securityGroupsList')).get(1).all(by.css('li')).count()).toBe(1);//should not add Virtual Ip to list

      components.topology.page.pushCancelEditBtn(3);

      browser.sleep(200).then(done);
    });
    it('should remove Security Group', function(done) {

      components.topology.page.pushRemoveVirtualIpBtn();

      expect(components.layout.isElementDisplayed(element.all(by.css('.securityGroupsList')).get(1))).toBe(false);//hide Virtual Ip list

      browser.sleep(200).then(done);
    });
  });


});
