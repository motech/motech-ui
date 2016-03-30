(function () {
	'use strict';

	angular.module('motech-admin')
		.factory('BundlesFactory', BundlesFactory);

	BundlesFactory.$inject = ['$q', '$resource','ServerService', 'BootstrapDialog'];
	function BundlesFactory ($q, $resource, ServerService) {
		return $resource(
			ServerService.formatURL('/module/admin/api/bundles/:bundleId/:action'),
			{bundleId:'@bundleId'},
			{
	            start: {method:'POST', params: {action: 'start'}},
	            stop: {method:'POST', params: {action: 'stop'}},
	            restart: {method:'POST', params: {action: 'restart'}},
	            uninstall: {method: 'POST', params: {action: 'uninstall'}},
	            uninstallWithConfig: {method: 'POST', params: {action: 'uninstallconfig'}},
	            details: {method: 'GET', params: {action: 'detail'}}
        	}
        );
	}

})();