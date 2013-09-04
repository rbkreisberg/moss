require.config({
    paths: {
    	carve: '../bower_components/carve/carve',
    	crossfilter: '../bower_components/crossfilter/crossfilter',
    	queue: '../bower_components/queue-async/queue',
        jquery: '../bower_components/jquery/jquery',
        jqueryUI: '../bower_components/jquery-ui/ui/jquery-ui',
        bootstrap: 'vendor/bootstrap',
        science: '../bower_components/science/science.v1',
        filter: '../bower_components/carve/filter',
        underscore: '../bower_components/underscore/underscore',
        "mediator-js": '../bower_components/mediator-js/lib/mediator'
    },
    shim : {
    	"bootstrap" : {
    			"deps":['jquery'],
    			"exports": 'bootstrap'
    	},
        "jqueryUI" : {
                "deps": ['jquery'],
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

require(['app', 'underscore', 'jquery', 'jqueryUI','bootstrap', 'crossfilter' ], function (app, _, $) {
    'use strict';
    
    app.initialize( app.start );
    
});