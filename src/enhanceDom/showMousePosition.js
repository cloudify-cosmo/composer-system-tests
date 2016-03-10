'use strict';

exports.showMousePosition = function show() {
    // add jquery to the mix


    function addDot(ev) {

        var color = 'black',
            size = 6;

        switch (ev.type) {
            case 'click':
                color = 'red';
                break;
            case 'dblclick':
                color = 'blue';
                break;
            case 'mousemove':
                color = 'green';
                break;
        }

        var dotEl = $('<div></div>')
            .css({
                position: 'fixed',
                height: size + 'px',
                width: size + 'px',
                'background-color': color,
                top: ev.clientY,
                left: ev.clientX,

                'z-index': 9999,

                // make sure this dot won't interfere with the mouse events of other elements
                'pointer-events': 'none'
            })
            .appendTo('body');

        setTimeout(function () {
            dotEl.remove();
        }, 1000);

    }

    $(document).on({
        click: addDot,
        dblclick: addDot,
        mousemove: addDot
    });

};
