(function () {
	'use strict';

	angular.module('motech-admin')
		.controller('BundleController', bundleController);

	bundleController.$inject = ['$scope', '$rootScope', 'BootstrapDialog', 'ServerService'];
	function bundleController ($scope, $rootScope, BootstrapDialog, ServerService) {
		var bundle = $scope.bundle;

		this.start = startBundle;
		this.stop = stopBundle;
		this.restart = restartBundle;

		this.showDetails = showDetails;

	    function startBundle(){
    		bundle.$start();
	    }
		function stopBundle(){
			BootstrapDialog.show({
	        message: 'admin.confirm',
	        buttons: [{
	            label: 'admin.bundles.stop',
	            cssClass: 'btn-primary',
	            action: function(dialogRef){
	                console.log("Stopping: bundle." + bundle.bundleId);
	                bundle.$stop();
	            }
	        }, {
	            label: 'admin.cancel',
	            action: function(dialogRef){
	                dialogRef.close();
	            }
	        }]});
	    }
	    function restartBundle(){
	    	console.log("Restarting: bundle." + bundle.bundleId);
	    }

	    function showDetails(){
	    	bundle.$details(function(data){
	    		BootstrapDialog.show({
	    			title: bundle.name,
	    			message: angular.toJson(data)
	    		});
	    	});
	    }

	}

})();