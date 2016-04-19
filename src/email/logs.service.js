(function(){
	'use strict';

	angular.module('motech-email')
		.service('EmailLogsService', logsService);

	logsService.$inject = ['$resource', 'ServerService'];
	function logsService ($resource, ServerService) {
		return $resource('/module/email/emails');
	}

})();