/* jquery and jqueryUI are global */
define(['mediator-js'], function (Mediator) {
    'use strict';

    var deferral;
    var selected;

/* widget creation */

    function setupSideMenu() {
      $("#x_feature_select").on('click', function(evt, ui) {
        var candidateFeature = $('#feature_search').val();
        Mediator.publish('application:feature:selected', { label: candidateFeature, axis: 'x'})
      });
      $("#y_feature_select").on('click', function(evt, ui) {
        var candidateFeature = $('#feature_search').val();
        Mediator.publish('application:feature:selected', { label: candidateFeature, axis: 'y'})
      });
      $("#color_feature_select").on('click', function(evt, ui) {
        var candidateFeature = $('#feature_search').val();
        Mediator.publish('application:feature:selected', { label: candidateFeature, axis: 'class'})
      });
    }

/* widget event handling */
    
    function setupEvents() {
        deferral.resolve();
    }

/* populate widgets with data */
    function populateAutocomplete( feature_list ) {      

        var $featureSearch = $("#feature_search").autocomplete({
                                source : matchRequest,
                                minLength : 2,
                                delay : 200,
                                position : { my: "left top", at: "left bottom", of: "#feature_list", collision: "none"},
                                autoFocus : false,
                                appendTo : "#feature_list",
                                select: function( event, ui ) {
                                    selected = true;
                                }
        });
        

    function matchRequest(request, response) {
        function hasMatch(s) {
            return s.toLowerCase().indexOf(request.term.toLowerCase())!==-1;
        }
        var i, l, obj, matches = [];

        if (request.term==="") {
            response([]);
            return;
        }

        for  (i = 0, l = feature_list.length; i<l; i++) {
            obj = feature_list[i];
            if (hasMatch(obj.label) || hasMatch(obj.category)) {
                matches.push(obj);
            }
        }
        response(matches);
    }

        (function() {

            $featureSearch.data("ui-autocomplete")._renderMenu = function(ul, items) {
                var that = this;
                var currentCategory = "";
                _.each(items, function(item) {
                    if (item.category != currentCategory) {
                        $('<li/>').addClass('ui-autocomplete-category').html(item.category).appendTo(ul);
                        currentCategory = item.category;
                    }
                    that._renderItemData(ul, item);
                });
            };

            var originalCloseMethod = $featureSearch.data("ui-autocomplete").close;
            $featureSearch.data("ui-autocomplete").close = function(event) {
                if (!selected) {
                    //close requested by someone else, let it pass
                    originalCloseMethod.apply(this, arguments);
                }
                // selected = false;
            };
        })();
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