(function(){
	'use strict';

	angular.module('motech-admin')
		.controller('TopicsController', controller);

	controller.$inject = ['$scope', '$http', 'ServerService'];
	function controller($scope, $http, ServerService) {
        $scope.dataAvailable = true;

        $http.get(ServerService.formatURL('module/admin/api/topics/'))
        .success(function (data) {
            $scope.topi
        })
        .error(function () {
            $scope.dataAvailable = false;
        });
	}

})();
