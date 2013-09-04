/* jquery and jqueryUI are global */
define([], function () {
    'use strict';

    var deferral;

/* widget creation */

    function setupSideMenu() {
      
    }

/* widget event handling */
    
    function setupEvents() {
        deferral.resolve();
    }

/* populate widgets with data */
    function populateAutocomplete( list ) {
        $("#feature_search").autocomplete({
                                source : list,
                                minLength : 2,
                                delay : 200,
                                position : { my: "left top", at: "left bottom", of: "#feature_list", collision: "none"},
                                autoFocus : false,
                                appendTo : "#feature_list_hidden",
                                open : function( event, ui) {
                                    $('#feature_list').empty()
                                    $('#feature_list_hidden ul').clone().appendTo("#feature_list");
                                    return true;
                                }
        })
        .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
          return $( "<li class=\"feature\">" ).append( "<a>" + item.label + "</a>" ).appendTo( ul );
        }
    }

    var Menu = {
        initialize: function( ) {
            deferral = new $.Deferred();
            setupSideMenu();
            setupEvents();
            return deferral.promise();
        },
        populate: function( featureMatrix ) {
            populateAutocomplete( featureMatrix.features );
        },
        start: function() {

        }
    };
    return Menu;
});