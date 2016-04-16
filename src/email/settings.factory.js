(function(){
	'use strict';

	angular.module('motech-email')
		.factory('EmailSettingsFactory', emailSettingsFactory);

	emailSettingsFactory.$inject = ['$resource', 'ServerService'];
	function emailSettingsFactory ($resource, ServerService) {
        return $resource(ServerService.formatURL('module/email/settings'));
    };

})();