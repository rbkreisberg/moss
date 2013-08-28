
define(['queue'], function () {
    'use strict';



/* data retrieval */

function getClinicalData (deferral) {

	d3.tsv('data/samples.tsv')
	.row(function(d) {
		d["N:CLIN:Gestational_Age_at_Delivery"] = +d["N:CLIN:Gestational_Age_at_Delivery"];
		d["C:QCTL:PL_VERSION"] = +d["C:QCTL:PL_VERSION"];
		return d;
	})
	.get(function(err, rows){

	/* data cleaning, sorting, and model building*/

	deferral.resolve(rows);
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