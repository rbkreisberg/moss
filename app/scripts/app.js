/*global define */
define(['data', 'menu', 'vis'], function (data, menu, vis) {
    'use strict';

    
    var Application = {
        initialize: function (callback) {

            var carveContainer = '#carve-container';

            var dataInit = data.retrieve();

            dataInit.done( [
                function () { menu.initialize(); },
                function (data) {
                    vis.initialize(carveContainer)
                        .data(data)
                        .draw();
                }
            ] );
                
            dataInit.then( callback );

        },
        start: function() {
            console.log('app started!');
        }
    };
    return Application;
});