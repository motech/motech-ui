(function () {
	'use strict';

	angular.module('motech-server')
		.factory('motechServerStatusHttpInterceptor', motechServerStatusHttpInterceptor)
		.config(httpConfig);

	motechServerStatusHttpInterceptor.$inject = ['$q', '$rootScope', 'ServerService'];
	function motechServerStatusHttpInterceptor ($q, $rootScope, ServerService) {
		return {
			request: function(config) {
				var deferred = $q.defer();
				if(ServerService.isURL(config.url) 
					&& config.url != ServerService.formatURL('server/bootstrap/status') // check status URL
					&& !ServerService.isReady()){
						$rootScope.$broadcast('motech.checkStatus');
						ServerService.whenReady().then(function(){
							deferred.resolve(config);
						});
				} else {
					deferred.resolve(config);
				}
				return deferred.promise;
			}
		}
	}

	httpConfig.$inject = ['$httpProvider'];
	function httpConfig($httpProvider) {
		$httpProvider.interceptors.push('motechServerStatusHttpInterceptor');
	}

})();