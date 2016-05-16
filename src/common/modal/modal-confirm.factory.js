(function(){
	'use strict';

	angular.module('motech-common')
		.factory('MotechConfirm', factory);

	factory.$inject = ['$q', 'ModalFactory'];
	function factory($q, ModalFactory){
		return function(message, title){
			var deferred = $q.defer();
			ModalFactory.showConfirm(message, title, function(result){
				if(result){
					deferred.resolve();
				} else {
					deferred.reject();
				}
			});
			return deferred.promise;
		};
	}

})();