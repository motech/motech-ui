(function () {
    'use strict';

    angular.module('motech-admin')
        .controller('QueueController', controller);

    controller.$inject = ['$scope', '$http', '$stateParams'];
    function controller ($scope, $http, $stateParams) {
        var queue = $stateParams.queueName;
        $scope.module = queue;
    }
})();
