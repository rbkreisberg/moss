
define(['carve', 'filter', 'underscore'], function (carveVis, filter, _) {
	'use strict';

	var carve;

	var labels = {'x' : 'C:ADMX:Admix_80_Percent', 'y' : 'N:CLIN:Gestational_Age_at_Delivery', list : [], class: 'C:ADMX:Admix_14_max'},
	insistCategoricalValues = { 'x':  [], 'y' : [] };
	/* Vis object creation */

	function setupCarveObject( plotContainer ) {
		carve = carveVis({
			radius: 8,
			margin : {
				top: 10, left: 10, bottom: 30, right: 40
			}
		})(plotContainer);
	}

	function populateCarve( data ) {
		carve
		.clear(true)
		.axisLabel(labels)
		.axisKey(labels)
		.colorBy( { label: labels.class, list: _.uniq(_.pluck(data, labels.class) ) } )
		.axisInsistCategoricalValues(insistCategoricalValues)
		.axisValueDictionary( { 'x' : { 'true' : 'true'}})
		.data(data);

	}

	/* event handlers */

	function drawCarve() {
		carve.render();
	}

	var Vis = {
		initialize: function( container ) {
			setupCarveObject(container);
			return this;
		},
		data: function(data) {
			populateCarve(data);
			return this;
		},
		draw: function(data) {
			if (data !== undefined) { populateCarve(data); }
			drawCarve();
			return this;
		}
	};
	return Vis;
});