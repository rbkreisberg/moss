
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
			var features, ignoreKeys, table, samples = [];
			if (rows && rows.length) {
				features = _(_.pluck(rows, 'label')).map(function(val) { var fields = val.split(":"); return fields[2] + ":" + fields[7];});
				ignoreKeys = ['label'];
				samples = Object.keys(rows[0]);
				table = _.map(_.without.apply(_, [samples].concat(ignoreKeys)), function(sampleID) {
					return _.extend({
						'id': sampleID
					}, _.object(features, _.pluck(rows, sampleID)));
				});
			}

		/* data cleaning, sorting, and model building*/

		deferral.resolve({features: features, samples: samples, data: table});
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