(function () {
	'use strict';

	angular.module('motech-auth')
		.service('AuthService', AuthService);

	AuthService.$inject = ['$q', '$http', 'authService', 'ServerService'];
	function AuthService ($q, $http, authService, ServerService) {
		this.login = login;

		function login (username, password) {
			var deferred = $q.defer();

			var promise = $http({
				url: ServerService.formatURL('module/server/motech/j_spring_security_check'),
				method: 'POST',
				data: {
					j_username: username,
					j_password: password
				},
				ignoreAuthModule: true,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			});
			
			promise.then(function () {
				authService.loginConfirmed();
				deferred.resolve();
			});
			promise.catch(function(response){
				if(response.data && response.data.message){
					deferred.reject(response.data.message);
				} else {
					deferred.reject();
				}
			})

			return deferred.promise;
		}
	}

})();