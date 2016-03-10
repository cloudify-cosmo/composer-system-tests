//'use strict';
//var fs = require('fs-extra');
//var logger = require('log4js').getLogger('Download-e2e');
//var exec = require('child_process').exec;
//var path = rootPwd+'/e2e/tmp';
//var filename =  rootPwd+'/e2e/tmp/blueprint.tar.gz';
//var _ = require('lodash');
//var commonActivities = require('../GenericFunctionality/common');
//
//if (fs.existsSync(filename)) {
//    fs.unlinkSync(filename);
//}
//
////todo: fix test - rewrite it..
///**
// * This test downloads the blueprint.tar.gz, verifies the tar had been downloaded, then it extracts the tar and checks that the
// * tmp folder contains more than 1 file (the old tar + the extracted folder), then it checks that the folder contains at least 1 file (more than 0)
// */
//describe('download a blueprint.tar.gz', function() {
//    beforeEach(function() {
//
//        logger.info('filename: ' + path);
//
//        logger.info('removing tmp dir if exists: ' + path);
//        fs.removeSync(path);
//
//        browser.get('http://127.0.0.1:9000/');
//        commonActivities.login();
//    });
//
//    xit('download a blueprint tar.gz', function(done) {
//        fs.ensureDirSync(path);
//        logger.info('creating new dir: ' + path);
//        var downloadBtn = element(by.id('downloadBtn'));
//        downloadBtn.click();
//       // browser.pause();
//      //  logger.info('file exists? ' + shell.test('-e', filename));
//
//        browser.wait(function(){
//            var cmd = 'cd ' + rootPwd+'/e2e/tmp/' +' && tar -xzf '+ filename;
//            exec(cmd, function(error, stdout, stderr) {
//              //  return (shell.test('-e', filename));
//
//            });
//
//            //shell.exec('cd ' + rootPwd+'/e2e/tmp/' +' && sudo tar -xzf '+ filename);
//            //return (shell.test('-e', filename));
//
//        },10000).then(function(){
//           // logger.info('file exists? ' + shell.test('-e', filename));
//           // expect(shell.test('-e', filename)).toEqual(true);
//            //var files =  shell.ls( rootPwd+'/e2e/tmp/');
//            // check if tmp folder currently contains more than the blueprint.tar.gz meaning the extract went well.
//            expect(files.length).toBeGreaterThan(0);
//            _.each(files, function(path){
//                var stats = fs.statSync(rootPwd+'/e2e/tmp/'+path);
//                if(stats.isDirectory()){
//                    logger.info('dir: ' + path);
//                  //  var blueprint =  shell.ls( rootPwd+'/e2e/tmp/'+path);
//                    logger.info('files in dir: ' + blueprint);
//                    // check if extracted directory contains at least 1 file (blueprint.yaml)
//                    //expect(blueprint.length).toBeGreaterThan(0);
//                }
//            });
//
//            done();
//        });
//
//    });
//
//
//    afterEach(function() {
//        fs.removeSync(path);
//    });
//});
