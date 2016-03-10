/**
 * adds a click event dispatcher for d3
 *
 * http://stackoverflow.com/a/11180172
 *
 * to be injected on browser with executeScript
 */

exports.d3Click = function() {
    $.fn.d3Click = function () {
        this.each(function (i, e) {
            var evt = new MouseEvent("click");
            e.dispatchEvent(evt);
        });
    };
};

exports.d3Event = function(){
    $.fn.d3Event = function(eventName, props) {
        var event = document.createEvent('SVGEvents');
        if ( props ) {
            _.merge(event, props);
        }
        event.initEvent(eventName,true,true);
        this[0].dispatchEvent(event);
        return $(this);
    };
};