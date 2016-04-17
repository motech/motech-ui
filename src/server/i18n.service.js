(function(){
	'use strict';

	angular.module('motech-server')
		.service('i18nService', service);

	service.$inject = ['$q', '$http', 'ServerService', '$translate'];
	function service ($q, $http, ServerService, $translate) {
		this.getMessage = getMessage;

		function getMessage(msg){
			return msg;
		}

		return this;
	}
	
})();