(function () {
	'use strict';

	angular.module('motech-auth')
		.directive('motechLogin', LoginForm);

	function LoginForm() {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: '/auth/login.html',
			controller: LoginFormController,
			controllerAs: 'loginFormController',
			link: LoginFormDirective
		}
	}

	LoginFormController.$inject = ['$q', '$scope', 'AuthService'];
	function LoginFormController ($scope, AuthService) {
		$scope.login = login;
		function login () {
			var deferred = $q.defer();
			AuthService.login($scope.username, $scope.password)
			.then(function (value) {
				deferred.resolve(value);
			})
			.catch(function(rejection){
				$scope.error = rejection;
				deferred.reject();
			});

			return deferred.promise;
		}
	}

	function LoginFormDirective (scope, element, attrs) {
		element.on('submit', function (event) {
			event.preventDefault();
			element.addClass('loading');
			scope.login()
			.finally(function(){
				element.removeClass('loading');
			});
		});
	}


})();