(function(){
    'use strict';

    angular.module('motech-common')
        .directive('inputFilterGroup', inputFilterGroupDirective);

    inputFilterGroupDirective.$inject = [];
    function inputFilterGroupDirective () {
        return {
            restrict: 'E',
            replace: true,
            //require: 'ngModel',
            scope: {
                initialValues: "="
            },
            templateUrl: '/common/input-filter/input-filter-group.html',
            //controller: 'InputFilterController',
            //controllerAs: 'InputFilterCtrl',
            link: function (scope, element, attrs, ctrl) {

            }
        };
    }

})();