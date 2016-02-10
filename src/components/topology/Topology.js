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


