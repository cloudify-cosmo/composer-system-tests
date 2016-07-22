'use strict';


/**
 *
 * functions used in Topology
 *
 **/

exports.findSpecificNodeContainerOnTopologyPage = function(importType, conteinerName){
  return element(by.cssContainingText('.stencil-type', importType)).element(by.xpath('../../..')).element(by.cssContainingText('.name', conteinerName));
};

exports.openNode = function(number){
  if(!number){number = 0;}
  return element.all(by.css('.nodeContainer')).get(number).click();
};
exports.openConnector = function(number){
  if (!number) {
    number = 0;
  }
  return element.all(by.css('.connectorContainer')).get(number).all(by.css('.connectorPoints')).get(1).click();
};

exports.closeNode = function(){
  element.all(by.css('.icon-closed')).get(0).click();
  return browser.sleep(400);
};

exports.deleteNode = function(){
  element.all(by.css('#deleteBtn')).get(0).click();
  return browser.sleep(400);
};

exports.renameNodeName = function(newName){
  $('[ng-click="showNameEditor()"]').click();
  return element.all(by.model('data.nameToEdit')).get(0).clear().sendKeys(newName);
};

exports.setInstances = function(number){
  return element(by.model('data.selectedNode.templateData.instances.deploy')).clear().sendKeys(number);
};
exports.removeInstances = function(){
  return element(by.model('data.selectedNode.templateData.instances.deploy')).clear();
};

exports.setPropertyValue = function(value){
  return element.all(by.css('.propsContainer .tt-input')).get(0).clear().sendKeys(value);
};

exports.getPropertyValue = function(){
  return element.all(by.css('.propsContainer .tt-input')).get(0).getAttribute('value');
};

exports.openPropertyModalEditor = function(){
  $$('[ng-click="showPropEditor(prop,data.selectedNode.templateData.properties[prop])"]').get(0).click();
  return browser.sleep(400);
};

exports.openImplementationModalEditor = function(){
  $$('[ng-click="showImplementationEditor(interfacesPropName,interfaceName,method,methodData)"]').get(0).click();
  return browser.sleep(400);
};

exports.searchElementInRepeat = function(el, repeat){
  return el.all(by.repeater(repeat)).filter(function(result){
    return result;
  });
};

exports.saveBlueprint = function(){
  return $('[ng-click="saveOrUpdateBlueprint()"]').click();
};

exports.openNodeSection = function(number){
  if(!number){number = 0;}
  $$('[ng-click="toggleOpen($event,\'Node\')"]').get(number).click();
  return browser.sleep(400);
};

exports.openConnectorRelationshipSection = function(){
  $$('[ng-click="toggleOpen($event,\'Connector\')"]').get(2).click();
  return browser.sleep(400);
};

exports.selectContainedInConnection = function() {
  return $('[ng-click="selectContainedInConnection()"]').click();
};
exports.addCustomInterfaceInput = function(){
  return $$('[ng-click="createInput(interfaceName,method,methodData)"]').get(0).click();
};

exports.removeCustomInterfaceInput = function(){
  return $$('.delete-input').get(0).click();
};

exports.changeImplementationName = function(newName){
  return $$('.methodDataRow .tt-input').get(0).clear().sendKeys(newName);
};

exports.selectSpecificImplementation = function(implementation){
  return  element.all(by.cssContainingText('.plugin-operations li', implementation)).get(0).click();
};

exports.openNetworkSection = function(){
  $$('[ng-click="toggleOpen($event,\'Compute\')"]').get(0).click();
  return browser.sleep(400);
};

exports.pushAddSecurityGroupBtn = function(){
  return $$('.add-security-button').get(0).click();
};

exports.pushRemoveSecurityGroupBtn = function(){
  return $$('[ng-click="removeSecurityGroup(securityGroup)"]').get(0).click();
};

exports.pushCancelEditBtn = function(number){
  return $$('.add-security-group-section .cancelEditBtn').get(number).click();
};

exports.pushAddEditBtn = function(number){
  return $$('.add-security-group-section .icon-add').get(number).click();
};


exports.pushVirtualIpBtn = function(){
  return $$('.add-security-button').get(1).click();
};

exports.pushRemoveVirtualIpBtn = function(){
  return $$('[ng-click="removeVirtualIp(virtualIp)"]').get(0).click();
};

exports.drawConnectorLine = function(from, to){
  browser.actions()
      .mouseMove(from)
      .mouseMove(from.element(by.css('.rightConnector')))
      .mouseDown()
      .mouseMove(to)
      .mouseUp()
      .perform();
};


