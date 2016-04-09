(function () {
	'use strict';

	angular.module('motech-auth')
		.service('AuthService', AuthService);

	AuthService.$inject = ['$q', '$http', 'authService', 'ServerService'];
	function AuthService ($q, $http, authService, ServerService) {
		this.login = login;

		function login (username, password) {
			var promise = $http({
				url: ServerService.formatURL('module/server/motech/j_spring_security_check'),
				method: 'POST',
				data: {
					j_username: username,
					j_password: password
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			});
			
			promise.then(function () {
				authService.loginConfirmed();
			});

			return promise;
		}
	}

})();