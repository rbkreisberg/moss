
define(['queue'], function () {
    'use strict';

/* data retrieval */

	function getClinicalData (deferral) {

		d3.tsv('data/samples2.tsv')
		.row(function(d) {
			var ignoreKeys = ['label']
			var values = _.omit.apply(this, d, ignoreKeys);
			var firstVal = values[0];
			if (!isNaN(parseFloat(firstVal)) && isFinite(firstVal) ) values =_.map(values, function(val) { return +val;});
			d = _.extend(d, values);
			return d;
		})
		.get(function(err, rows){

			var features = _.pluck(rows ,'label');
			var ignoreKeys = ['label']
			var table = _.map(_.without.apply(_, [Object.keys(rows[0])].concat(ignoreKeys)), function(sampleID) {
				return _.extend({'id': sampleID}, _.object(features, _.pluck(rows, sampleID)));
			});

		/* data cleaning, sorting, and model building*/

		deferral.resolve(table);
		});

	}

    var Data = {
		retrieve: function( ) {
			var deferral = new $.Deferred();

			getClinicalData( deferral );
			return deferral.promise();
		},
		start: function() {

		}
	};
    return Data;
});