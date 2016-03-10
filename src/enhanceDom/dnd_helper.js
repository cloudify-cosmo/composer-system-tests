'use strict';

// ignore globals since this code runs on frontend
/* jshint undef: false */

var fs = require('fs');
var path = require('path');
exports.execute = function inject(){
   browser.executeScript( fs.readFileSync(path.join(__dirname, 'jquery.simulate.js')).toString());


    //use like this:
    //dragBtn.simulate('drag', { dy:10});
};

/**
 * defines some composer specific dnd helper methods
 */
exports.composer = function () {
    $.composer = {
        getNode : function(name){
            return $('.nodeContainer text.title:contains("' + name + '")').closest('.nodeContainer');
        },
        showNodeConnector: function(name){
            var node = $.composer.getNode(name);
            node.d3Event('mousemove');
            return { rightConnector: node.find('.rightConnector'), leftConnector: node.find('.leftConnector') };
        },
        connectNodes: function( fromName, toName ){
            //var fromNode = $.composer.getNode(fromName);
            var toNode = $.composer.getNode(toName);

            //var toCorner = toNode.findCorner();
            //var toPoint = { x : toNode.position().left , y:toNode.position().top};
            //
            var fromConnector = $.composer.showNodeConnector(fromName).rightConnector;
            var toConnector = $.composer.showNodeConnector(toName).leftConnector;

            var fromPoint = fromConnector.findCenter();
            var toPoint = toConnector.findCenter();

            // GUY : NOTE : VERY_IMPORTANT!!!
            // I don't know why the coordinates are calculated from 0,0.. but they do..
            // I spent hours figuring this out.. do not change this!

            $(fromConnector).simulate('mousedown');
            $('svg').simulate('mousemove', { from:{x:0, y:0}, to:{ x: toPoint.x - fromPoint.x, y: toPoint.y - fromPoint.y }, callback:function(){
                $(toNode).simulate('mouseup');
            }});
        },
        addNode: function (name, position) {
            var el = _.find($('.stencilContainer'), function (e) {
                return $(e).text().indexOf(name) >= 0;
            });
            if (!!el) {
                $(el).simulate('mousedown');
                var corner = $(el).findCorner();


                $('svg').simulate('mousemove', { from: corner, to:position, callback: function(){
                    $(el).simulate('mouseup');
                }});

            }
        }

    };
};

exports.connectNodes = function( fromName, toName ){
    console.log('connecting nodes', fromName, toName );
    browser.executeScript(function(fromName, toName){
        $.composer.connectNodes(fromName, toName);
    }, fromName, toName);
    browser.sleep(2000);
};

exports.addNode = function( name, position ){
    console.log('adding node', name, position);
    browser.executeScript(function(name, position){
        $.composer.addNode(name, position);
    },name, position);
    browser.sleep(2000); // let animation do its thing..
};

