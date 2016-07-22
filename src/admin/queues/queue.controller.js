(function () {
    'use strict';

    angular.module('motech-admin')
        .controller('QueueController', controller);

    controller.$inject = ['$scope', 'queue'];
    function controller ($scope, queue) {
        $scope.messages = queue;
    }
})();
