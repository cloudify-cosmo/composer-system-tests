'use strict';

const _ = require('lodash');

/**
 *
 * functions used in Topology
 *
 **/

exports.findSpecificNodeContainerOnTopologyPage = function(importType, conteinerName) {
  return element(by.cssContainingText('.stencil-type', importType)).element(by.xpath('../../..')).element(by.cssContainingText('.name', conteinerName));
};

exports.openNode = function(number) {
  if (!number) {
    number = 0;
  }
  return element.all(by.css('.nodeContainer')).get(number).click();
};

exports.openConnector = function(number) {
  if (!number) {
    number = 0;
  }
  return element.all(by.css('.connectorContainer')).get(number).all(by.css('.connectorPoints')).get(1).click();
};

exports.changeConnectorType = function(number, name) {
  if (!number) {
    number = 0;
  }
  element.all(by.css('.listInput .dropdown-toggle')).get(number).click();
  return element.all(by.cssContainingText('.dropdown-menu li a', name)).get(0).click();
};

exports.closeNode = function() {
  element.all(by.css('.icon-closed')).get(0).click();
  return browser.sleep(400);
};

exports.deleteNode = function() {
  element.all(by.css('#deleteBtn')).get(0).click();
  return browser.sleep(400);
};

exports.renameNodeName = function(newName) {
  $('[ng-click="showNameEditor()"]').click();
  return element.all(by.model('data.nameToEdit')).get(0).clear().sendKeys(newName);
};

exports.setInstances = function(number) {
  return element(by.model('data.selectedNode.templateData.instances.deploy')).clear().sendKeys(number);
};
exports.removeInstances = function() {
  return element(by.model('data.selectedNode.templateData.instances.deploy')).clear();
};

exports.setPropertyValue = function(value) {
  return element.all(by.css('.propsContainer .propData')).get(0).clear().sendKeys(value);
};

exports.getPropertyValue = function() {
  return element.all(by.css('.propsContainer .propData')).get(0).getAttribute('value');
};

exports.openPropertyModalEditor = function() {
  $$('[ng-click="showPropEditor(prop,data.selectedNode.templateData.properties[prop])"]').get(0).click();
  return browser.sleep(400);
};

exports.openImplementationModalEditor = function() {
  $$('[ng-click="showImplementationEditor(interfacesPropName,interfaceName,method,methodData)"]').get(0).click();
  return browser.sleep(400);
};

exports.searchElementInRepeat = function(el, repeat) {
  return el.all(by.repeater(repeat)).filter(function(result) {
    return result;
  });
};

exports.selectContainedInConnection = function() {
  return $('[ng-click="selectContainedInConnection()"]').click();
};

exports.openNodeSection = function(number) {
  if (!number) {
    number = 0;
  }
  $$('[ng-click="toggleOpen($event,\'Node\')"]').get(number).click();
  return browser.sleep(800);
};

exports.openConnectorRelationshipSection = function() {
  $$('[ng-click="toggleOpen($event,\'Connector\')"]').get(2).click();
  return browser.sleep(400);
};

exports.addCustomInterfaceInput = function() {
  return $$('[ng-click="createInput(interfaceName,method,methodData)"]').get(0).click();
};

exports.removeCustomInterfaceInput = function() {
  return $$('.delete-input').get(0).click();
};

exports.changeImplementationName = function(newName) {
  return $$('.methodDataRow .implementationInput').get(0).clear().sendKeys(newName);
};

exports.selectSpecificImplementation = function(implementation) {
  return element(by.cssContainingText('.plugin-operations li', implementation)).click();
};

exports.openNetworkSection = function() {
  $$('[ng-click="toggleOpen($event,\'Compute\')"]').get(0).click();
  return browser.sleep(400);
};

exports.pushAddSecurityGroupBtn = function() {
  return $$('.add-security-button').get(0).click();
};

exports.pushRemoveSecurityGroupBtn = function() {
  $$('[ng-click="removeItem(securityGroup)"]').get(0).click();
  return browser.sleep(400);
};

exports.pushCancelEditBtn = function(number) {
  return $$('.add-security-group-section').get(number).element(by.css('.cancelEditBtn')).click();
};

exports.pushAddEditBtn = function(number) {
  $$('.add-security-group-section .icon-add').get(number).click();
  return browser.sleep(100);
};

exports.pushVirtualIpBtn = function() {
  return $$('.add-security-button').get(1).click();
};

exports.pushRemoveVirtualIpBtn = function() {
  return $$('[ng-click="removeItem(virtualIp)"]').get(0).click();
};

exports.getNode = function(name) {
  return element.all(by.css('.nodeContainer')).filter((elem) => {
    return elem.$('.title').getText().then((text) => {
      return text === name;
    });
  }).first();
};

// create a node from stencil and return its element
// we should send node number as second argument to return node what we need
// (it's strange but clone() method don't work in this case)
// if containerNode is provided, the node will be created inside it
exports.createNode = function(stencilName, nodeNumber, containerNode) {

  if(!containerNode){
    //if we don't have exact position in nodeAdd method we set default position:
    // left : by the left side of grid
    // top  : by center from the top of grid
    this.addNode(stencilName);
  }else{
    containerNode.getSize().then( size => {//find size
      containerNode.getLocation().then( location => {//find location
        //to put more that one node inside another we should drag the bottom of new node to the top of exist node
        this.addNode(stencilName, {x : location.x, y : (location.y - size.height) + 100 });
      });
    });

  }

  return element.all(by.css('.nodeContainer')).get(nodeNumber);
};

exports.addNode = function( name, position){
  //simulate drag and drop animation
  //we should using this way if we want to add more that one node inside another
  browser.executeScript(function(name, position){

    var el = _.find($('.stencilContainer'), function (e) {
      return $(e).text().indexOf(name) >= 0;
    });

    $('#toolbar').scrollTop(el.offsetTop);//scroll to node

    setTimeout(function(){
      $(el).simulate('mousedown');
      var corner = $(el).findCorner();
      if(!position){
        position = $('#gridContainer').findVerticalCenter();
      }

      $('svg').simulate('mousemove', { from: corner, to:position, callback: function(){
        $(el).simulate('mouseup');
      }});

    },500);//wait scroll

    setTimeout(function(){
      $('#toolbar').scrollTop(0);
    },1000);//scroll back after drag and drop


  },name, position);

  browser.sleep(2000); // let animation do its thing..
};

exports.drawConnectorLine = function(from, to) {
  browser.actions()
    .mouseMove(from)
    .mouseMove(from.element(by.css('.rightConnector')))
    .mouseDown()
    .mouseMove(to)
    .mouseUp()
    .perform();
};