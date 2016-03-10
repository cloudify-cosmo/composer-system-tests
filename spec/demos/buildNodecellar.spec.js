'use strict';

var enhanceDom = require('enhanceDom');

console.log('this is enhanceDom', enhanceDom.composerDnd);
describe('nodecellar demo', () => {

    it('should drag', (done) =>{


        browser.get('/');
        element(by.model('user.name')).sendKeys('guyguy');
        $('input[type=submit]').click();

        require('enhanceDom').inject();


        enhanceDom.composerDnd.addNode('Compute', { x : 300, y : 300});
        enhanceDom.composerDnd.addNode('Volume', { x : 320, y : 320});
        enhanceDom.composerDnd.addNode('Compute', { x : 650, y : 300});

        enhanceDom.composerDnd.connectNodes('New_Compute_1', 'New_Compute_3');

        browser.sleep(1000).then(done);

        //browser.ignoreSynchronization=true;
        //browser.get('http://www.w3schools.com/html/html5_draganddrop.asp');
        //browser.sleep(10000);
        //require('./dnd_helper').execute();
        //browser.sleep(3000).then(done);
    });
});