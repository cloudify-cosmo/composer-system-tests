'use strict';

/***
 * node panel utils starts
 */

//when there's one nodeType in topology, will select and click to open its panel
exports.openNodePanel = function(){
   return $$('rect').filter(function(elem) {
       return elem;
   }).then((e)=>{
       e[1].click();
   });
};

exports.closeNodePanel = function(){
    $('[ng-click="closeProperties()"]').click();
};

// will append '_newName' to existing nodeName
exports.renameNode = function(){
    browser.actions().doubleClick($('[ng-click="showNameEditor()"]')).perform();
    element( by.model('data.nameToEdit') ).sendKeys('_newName');
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
};

// gets selected node name from its panel
exports.getNodeName = function(){
   return $('[ng-click="showNameEditor()"]').getText().then((text)=>{
        console.log('node name is: ' + text);
            return text;
    });
};

exports.setNewInstancesNumber = function(number){
    element( by.model('data.selectedNode.templateData.instances.deploy') ).sendKeys(number);
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
};

// checks that the instances current number was updated and equals to the expectedNumber
exports.verifyNewInstanceNumberUpdate = function (expectedNumber) {
    $$('text').filter(function (elem) {
        return elem;
    }).then((e)=> {
        e[3].getText().then((instancesNumber)=> {
            console.log('number of instances: ' + instancesNumber);
            expect(instancesNumber).toEqual(expectedNumber);
        });
    });
};

exports.openPortEditModal = function(){
    $('[ng-click="showPropEditor(prop,propValue)"]').click();
};

//copies the deafult port to ace editor
exports.copyPortToEditor = function(){
    $('[ng-click="copyToEditor()"]').click();
};

// click 'done' button on the modal will save changes
exports.savePropsEditor = function(){
    $('[ng-click="savePropValue()"]').click();
};

exports.openInterfacesEditModal = function(){
    $('[ng-click="toggleOpen($event,\'Node\')"]').click();
};

exports.openImplementationEditModal = function(){
    $('[ng-click="showImplementationEditor(interfacesPropName,interfaceName,method)"]').click();
};
//ng-click="showImplementationEditor(interfacesPropName,interfaceName,method)"

// selects chef_plugin.operations.operation from chef list operations
function selectOperation(){
    $$('.plugin-operations li').filter(function(elem, index) {
        return elem.getText().then(function(text) {
            return text === 'chef_plugin.operations.operation';
        });
    }).first().click();
}

// saves the selected chef_plugin.operations.operation
exports.saveSelectedOperation = function(){
    selectOperation();
    browser.sleep(2000);
    $('[ng-click="submit()"]').click();
};

// adds an input to operation method
exports.addInput = function(){
    $('[ng-click="createInput(interfaceName,method,methodData)"]').click();
};

exports.editInput = function(){
   return $('[ ng-click="showEdit = true"]').click();
};

exports.getInputName = function(){
    //exports.editInput().sendKeys('_newName');
    //browser.actions().sendKeys(protractor.Key.ENTER).perform();
};

/***
 * node panel utils ends
 */


// blueprint selection dropdown-menu:

exports.selectBlueprint = function(){


};

exports.getBlueprintsList = function(){
    //var dropdown =
    return $('dropdown').click();
    //return dropdown.$$('li[ng-click="showSaveAlert(bp)"]');
};


