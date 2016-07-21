(function () {
    'use strict';

    angular.module('motech-admin')
        .controller('AdminQueueStatsCtrl', adminQueueStatsCtrl);

    adminQueueStatsCtrl.$inject = ['$scope', '$rootScope', 'QueuesFactory'];
    function adminQueueStatsCtrl ($scope, $rootScope, QueuesFactory) {

        $scope.dataAvailable = false;
        QueuesFactory.query(function(queues){
            $scope.queues = queues;
            $scope.dataAvailable = true;
        });
    }
})();
