(function () {
	'use strict';

	angular.module('motech-auth')
		.service('AuthService', AuthService);

	AuthService.$inject = ['$q', '$http', 'MOTECH_SERVER_URL'];
	function AuthService ($q, $http, MOTECH_SERVER_URL) {
		var loginUrl = MOTECH_SERVER_URL + 'module/server/motech/j_spring_security_check';

		this.login = login;
		this.check = checkAuth;

		function login (username, password) {
			var deferred = $q.defer();

			$http.post(loginUrl, {
				j_username: username,
				j_password: password,
			})
			.then(function () {
				deferred.resolve(true);
			}).catch(function () {
				deferred.reject('server.auth.error');
			});

			return deferred.promise;
		}

		function checkAuth () {
			var deferred = $q.defer();
			deferred.reject(); // TODO: Actually check the status
			return deferred.promise;
		}
	}

})();