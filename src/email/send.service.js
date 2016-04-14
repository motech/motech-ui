(function(){
	'use strict';

	angular.module('motech-email')
		.factory('EmailSendService', emailSendService);

	emailSendService.$inject = ['$resource', 'ServerService'];
	function emailSendService ($resource, ServerService) {
		return $resource(
			ServerService.formatURL('modules/email/send'));
	}
	
})();