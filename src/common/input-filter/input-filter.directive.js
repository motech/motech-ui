(function(){
    'use strict';

    angular.module('motech-common')
        .directive('inputFilter', inputFilterDirective);

    inputFilterDirective.$inject = [];
    function inputFilterDirective () {
        return {
            restrict: 'E',
            replace: true,
            require: 'ngModel',
            scope: {
                 ngModel: "=",
                 value: "=?",
                 label: "@"
            },
            templateUrl: '/common/input-filter/input-filter.html',
            //controller: 'InputFilterController',
            //controllerAs: 'InputFilterCtrl',
            link: function (scope, element, attrs, ctrl) {

            }
        };
    }

})();