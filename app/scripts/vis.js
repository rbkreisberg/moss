
define(['carve', 'filter', 'mediator-js', 'underscore'], function (carveVis, filter, Mediator, _) {
	'use strict';

	var carve;
	var colors = { 'Binary' : [
						'#84ACBA',
						'#FD8F42',
					],
					'TermCategory' : [
						'#D7191C',
						'#FDAE61',
						'#ABD9E9',
						'#2C7BB6'
					]
					};

	var labels = {'x' : 'Chorioamnionitis_during_delivery:', 'y' : 'Uterine_Related:', list : [], class: 'Preterm:'},
	insistCategoricalValues = { 'x':  [], 'y' : [] };
	/* Vis object creation */

	function setupCarveObject( plotContainer ) {
		carve = carveVis({
			radius: 8,
			margin : {
				top: 10, left: 10, bottom: 30, right: 40
			}
		})(plotContainer);
		colors['default'] = carve.colorBy()['colors'];
	}

	function populateCarve( data ) {
		carve
		.clear(true)
		.axisLabel(labels)
		.axisKey(labels)
		.colorBy( getColorByValues(data) )
		.axisInsistCategoricalValues(insistCategoricalValues)
		.axisValueDictionary( { 'x' : { 'true' : 'true'}})
		.data(data);
	}

	function getColorByValues(data) {
		var color_values = _.uniq(_.pluck(data, labels.class));
		var color_palette = color_values.length === 2 ? colors['Binary'] : colors['default'];
		if (labels.class.indexOf('TermCategory') >=0) color_palette = colors['TermCategory'];

		return { label: labels.class, list: color_values, colors: color_palette }
	}

	function changeFeatures() {
		carve
			.axisLabel(labels)
			.axisKey(labels)
			.colorBy( getColorByValues(carve.data()) );
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
