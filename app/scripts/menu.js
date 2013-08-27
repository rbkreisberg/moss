/* jquery and jqueryUI are global */
define([], function () {
    'use strict';

    var deferral;

/* widget creation */


/* widget event handling */
    
function setupEvents() {
    deferral.resolve();
}

    var Menu = {
    	initialize: function( ) {
            deferral = new $.Deferred();

            setupEvents();
            return deferral.promise();
        },
    	start: function() {

    	}
    };
    return Menu;
});