(function(){
	'use strict';

	angular.module('motech-auth')
		.directive('motechAuth', directive);

	controller.$inject = ['$scope', 'AuthService'];
	function controller($scope, AuthService){
		$scope.userName = false;
		$scope.logout = doLogout;

		$scope.$watch(function(){
			return AuthService.user
		}, function(user){
			if(user){
				$scope.userName = user;
			} else {
				$scope.userName = false;
			}
		});

		function doLogout(){
			AuthService.logout();
		}
	}

	directive.$inject = [];
	function directive(){
		return {
			restrict: 'A',
			controller: controller,
			controllerAs: "AuthCtrl"
		}
	}

})();