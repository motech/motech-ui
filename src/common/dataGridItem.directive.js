(function () {
    'use strict';

    angular.module('motech-common')
        .directive('motechDataGridItem', function(){
            return {
                restrict: 'EA',
                replace: true,
                transclude: true,
                template: '<li ng-transclude></li>'
            }
        });
})();