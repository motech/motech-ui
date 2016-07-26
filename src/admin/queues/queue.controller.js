(function () {
    'use strict';

    angular.module('motech-admin')
        .controller('QueueController', controller);

    controller.$inject = ['$scope', '$stateParams', '$http', 'ServerService'];
    function controller ($scope, $stateParams, $http, ServerService) {
        $scope.dataAvailable = true;
        $http.get(ServerService.formatURL('/module/admin/api/queues/browse?queueName=' + $stateParams.queueName)).success(function (data) {
            $scope.messages = data;
        }).error(function () {
            $scope.dataAvailable = false;
        });
    }
})();
