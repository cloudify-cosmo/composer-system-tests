'use strict';


exports.PAGES = {
    TOPOLOGY: 'topology',
    INPUTS_OUTPUTS: 'inputs & outputs',
    DEFINITIONS: 'definitions',
    RESOURCES: 'resources',
    SOURCE: 'source'
};

exports.logout = function(){
    return $('.icon-logout').click();
};

exports.goToResources = function(){
    exports.goTo( exports.PAGES.RESOURCES );
};

exports.goToDefinitions = function(){
    exports.goTo( exports.PAGES.DEFINITIONS );
};

exports.goTo = function( page ){
    return $$('#head .pageSwitchContainer a').filter(function(e){
        return e.getText().then(function( text ){

            var result = text.toLowerCase().trim() === page.toLowerCase().trim();
            console.log('looking for page',text, page, result );
            return result;
        })
    }).then(function(results){
        results[0].click();
        console.log('found items', results.length);
       return results;
    });
};
