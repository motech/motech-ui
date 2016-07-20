(function(){
    'use strict';

    angular.module('motech-common')
        .directive('inputFilterGroup', inputFilterGroupDirective);

    inputFilterGroupDirective.$inject = [];
    function inputFilterGroupDirective () {
        return {
            restrict: 'E',
            replace: true,
            require: 'ngModel',
            scope: {
                ngModel: "=",
                checkboxes: "="
            },
            templateUrl: '/common/input-filter/input-filter-group.html',
            controller: 'InputFilterGroupController',
            controllerAs: 'InputFilterGroupCtrl'
        };
    }

})();