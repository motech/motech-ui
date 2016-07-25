(function () {
    'use strict';

    angular.module('motech-admin')
        .controller('QueueController', controller);

    controller.$inject = ['$scope', '$stateParams', '$http'];
    function controller ($scope, $stateParams, $http) {
        $scope.dataAvailable = true;
        var queue = $stateParams.queueName;
        $http.get('/module/admin/api/queues/browse?queueName=' + queue).success(function (data) {
            $scope.messages = data;
        }).error(function () {
            $scope.dataAvailable = false;
        });
    }
})();
