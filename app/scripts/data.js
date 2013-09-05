
define(['queue'], function () {
    'use strict';

/* data retrieval */

	function getClinicalData (deferral) {

		d3.tsv('data/samples2.tsv')
		.row(function(d) {
			var ignoreKeys = ['label'];
			for (var k in d) {
				if (k in ignoreKeys) continue;
				if (!isNaN(parseFloat(d[k])) && isFinite(d[k]) ) d[k] = +d[k];
			}
			return d;
		})
		.get(function(err, rows){
			var features, categories, feature_objs, ignoreKeys, table, samples = [];
			var sublabel;
			if (rows && rows.length) {
				features = _(_.pluck(rows, 'label')).map(function(val) { var fields = val.split(":"); return fields[2] + ":" + fields[7];});
				categories = _.map(features, function(label) { return label.split(":")[0];});
				feature_objs = _.map(features, function(label, i){ sublabel = label.split(":")[1]; return sublabel === "" ? {label : label.slice(0,-1) , category: "" , value: label} : {label : sublabel, category : categories[i] , value: label};});	 
				ignoreKeys = ['label'];
				samples = Object.keys(rows[0]);
				table = _.map(_.without.apply(_, [samples].concat(ignoreKeys)), function(sampleID) {
					return _.extend({
						'id': sampleID,
					}, _.object(features, _.pluck(rows, sampleID)));
				});
			}

		/* data cleaning, sorting, and model building*/

		deferral.resolve({features: feature_objs, samples: samples, data: table});
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