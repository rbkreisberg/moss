/*global define */
define(['data', 'menu', 'vis'], function (data, menu, vis) {
    'use strict';

    
    var Application = {
    	initialize: function (callback) {

    		var carve_container = "#carve-container";

    		var data_init = data.retrieve();

    		data_init.done( [
    			function (data) { menu.initialize(); }, 
    			function (data) { 
    				vis.initialize(carve_container)
    					.data(data)
    					.draw();
    				}
    			] );
    			
    		data_init.then( callback );

    	},
    	start: function() {
    		console.log('app started!');
    	}
    };
    return Application;
});