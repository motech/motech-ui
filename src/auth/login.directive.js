(function () {
	'use strict';

	angular.module('motech-auth')
		.directive('motechLogin', LoginForm);

	function LoginForm() {
		return {
			restrict: 'EA',
			replace: true,
			scope:{},
			templateUrl: '/auth/login.html',
			controller: LoginFormController,
			controllerAs: 'LoginCtrl',
			link: LoginFormDirective
		}
	}

	LoginFormController.$inject = ['AuthService'];
	function LoginFormController (AuthService) {
		this.login = login;
		function login (username, password) {
			return AuthService.login(username, password);
		}
	}

	function LoginFormDirective (scope, element, attrs) {
		scope.doLogin = function () {
			delete scope.error;
			scope.LoginCtrl.login(scope.username, scope.password)
			.catch(function(message){
				scope.error = message;
			});
		};
	}


})();