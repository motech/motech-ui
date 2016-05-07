(function(){
	'use strict';

	angular.module('motech-auth')
		.directive('motechAuth', directive);

	controller.$inject = ['$scope', '$http', 'ServerService'];
	function controller($scope, $http, ServerService){
		$scope.userName = false;
		$scope.language = false;
		$scope.logout = doLogout;

		$http.get(ServerService.formatURL('/module/server/getUser'))
		.then(function(response){
			$scope.userName = response.data.userName;
		});

		function doLogout(){

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