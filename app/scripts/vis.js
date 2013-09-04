
define(['carve', 'filter', 'mediator-js', 'underscore'], function (carveVis, filter, Mediator, _) {
	'use strict';

	var carve;

	var labels = {'x' : 'Chorioamnionitis_during_delivery:', 'y' : 'Uterine_Related:', list : [], class: 'TermCategory:'},
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

	function changeFeatures() {
		carve
			.axisLabel(labels)
			.axisKey(labels)
			.colorBy( { label: labels.class, list: _.uniq(_.pluck(carve.data(), labels.class) ) } );
	}

	/* event handlers */

	function drawCarve() {
		carve.render();
	}


	function subscribeEvents() {
		Mediator.subscribe("application:feature:selected", function (msg) {
			if (msg.axis) {
				labels[msg.axis] = msg.label;
				changeFeatures();
				drawCarve()
			}
		});
	}

	var Vis = {
		initialize: function( container ) {
			setupCarveObject(container);
			subscribeEvents();
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