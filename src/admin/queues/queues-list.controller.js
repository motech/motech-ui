(function () {
    'use strict';

    angular.module('motech-admin')
        .controller('AdminQueueStatsCtrl', adminQueueStatsCtrl);

    adminQueueStatsCtrl.$inject = ['$scope', '$rootScope', 'QueuesFactory'];
    function adminQueueStatsCtrl ($scope, $rootScope, QueuesFactory) {

        $scope.dataAvailable = true;
        QueuesFactory.query(function(queues){
            $scope.queues = queues;
        }, function(){
             $scope.dataAvailable = false;
        });
    }
})();
