(function(){
    'use strict';

    angular.module('motech-server')
        .directive('motechServerInfo', directive);

    controller.$inject = ['$scope', 'ServerInfoService'];
    function controller($scope, ServerInfoService){
        $scope.$watch(function(){
            return ServerInfoService.information;
        }, function(information){
            $scope.information = information;
            $scope.serverRunning = ServerInfoService.running;
        });
    }

    function directive(){
        return {
            restrict: 'A',
            controller: controller
        };
    }

})();