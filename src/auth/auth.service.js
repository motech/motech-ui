(function () {
	'use strict';

	angular.module('motech-auth')
		.service('AuthService', AuthService);

	AuthService.$inject = ['$q', '$http'];
	function AuthService ($q, $http) {
		var loginUrl = motechServerURL + 'motech/j_spring_something';

		this.login = login;
		this.check = checkAuth;

		function login (username, password) {
			var deferred = $q.defer();

			$http.post(loginUrl, {
				username:username,
				password:password
			}).then(function () {
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