/*global define */
define(['data', 'menu', 'vis','mediator-js'], function (data, menu, vis, Mediator) {
    'use strict';

    
    var Application = {
        initialize: function (callback) {

            var carveContainer = '#carve-container';

            var dataInit = data.retrieve();

            dataInit.done( [
                function () { 
                    menu.initialize(); 
                },
                function (featureMatrix) {
                	if (featureMatrix.data && featureMatrix.data.length) {
                         menu.populate(featureMatrix);
                    return vis.initialize(carveContainer)
                        .data(featureMatrix.data)
                        .draw();
                    }
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