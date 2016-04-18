(function(){
	'use strict';

	angular.module('motech-common')
		.factory('motechAlert', alert);
	
	alert.$inject = ['$q', 'BootstrapDialog'];
	function alert($q, BootstrapDialog) {
		return function(message, title){
			var deferred = $q.defer();
			BootstrapDialog.show({
				message: message,
				title: title,
				buttons: [{
					label: 'OK',
					action: function(dialog) {
						dialog.close();
						deferred.resolve();
					}
				}]
			});
			return deferred.promise;
		}
	}

})();