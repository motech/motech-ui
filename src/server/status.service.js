(function () {
	'use strict';

	angular.module('motech-server')
		.service('ServerStatusService', motechServerStatusService);

	motechServerStatusService.$inject = ['$q', '$rootScope', '$http', 'MOTECH_SERVER_URL'];
	function motechServerStatusService ($q, $rootScope, $http, MOTECH_SERVER_URL) {
		var service = this;
		var statusURL = MOTECH_SERVER_URL + 'server/bootstrap/status';

		this.running = false;
		this.errors = [];

		this.startedBundles = [];

		this.getStatus = getStatus;
		this.hasErrors = hasErrors;

		function getStatus() {
			var deferred = $q.defer();
			console.log("ServerStatusService: get status");
			$rootScope.$broadcast('motech.statusCheck.start');
			$http.get(statusURL)
			.then(function(response){
				service.startedBundles = response.data.osgiStartedBundles;
				if(response.data.startupProgressPercentage == 100) {
					deferred.resolve(true);
				}
				if(response.data.startupProgressPercentage < 100){
					deferred.notify(response.data.startupProgressPercentage);
					getStatus();
				}
			}).catch(function(){
				service.errors.push("Could not reach MOTECH server");
				deferred.reject(false);
			});

			deferred.promise.then(function(){
				service.running = true;
			}).catch(function(){
				service.running = false;
			}).finally(
				function(){
					$rootScope.$broadcast('motech.statusCheck.stop');
				},
				function(){
					$rootScope.$broadcast('motech.statusCheck.update');
				}
			);

			return deferred.promise;
		}

		function hasErrors () {
			if(service.errors.length > 0){
				return true;
			}
			return false;
		}
	}

})();