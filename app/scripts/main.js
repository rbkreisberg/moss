require.config({
    paths: {
    	carve: '../bower_components/carve/carve',
    	crossfilter: '../bower_components/crossfilter/crossfilter',
    	queue: '../bower_components/queue-async/queue',
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        science: '../bower_components/science/science.v1',
        filter: '../bower_components/carve/filter',
        underscore: '../bower_components/underscore/underscore'
    },
    shim : {
    	"bootstrap" : {
    			"deps":['jquery'],
    			"exports": '$'
    	},
    	"underscore" : {
    		"exports": '_'
    	},
    	"carve" : {
    	 "deps" : ['underscore', 'science'],
    	 "exports" : "carve"
    	},
    	"filter" : {
    		"deps" : ['crossfilter'],
    		"exports" : "filter"
    	}
    }
});

require(['app', 'jquery', 'underscore','bootstrap', 'crossfilter'], function (app, $, _) {
    'use strict';
    
    app.initialize( app.start );
    
});