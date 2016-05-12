(function(){
    'use strict';

    angular.module('motech-dashboard')
        .directive('motechAppState', directive);

    controller.$inject = ['$scope', 'AppStateService'];
    function controller($scope, AppStateService){
        $scope.$on('motech.refresh', function(){
            $scope.appReady = false;
        });
        $scope.$on('motech.app.ready', function(){
            $scope.appReady = true;
        });

        $scope.$broadcast('motech.refresh');
    }

    function directive(){
        return {
            restrict: 'A',
            controller: controller,
            controllerAs: 'AppStateCtrl'
        };
    }

})();