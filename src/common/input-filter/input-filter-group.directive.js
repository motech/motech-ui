(function(){
    'use strict';

    /**
     * @memberOf motech-common
     * @ngdoc directive
     * @name  InputFilterGroup
     * @scope true
     *
     * @param { } ng-model Takes variable that contains an object.
     * @param { } checkboxes List of checkboxes that are controlled as an input group.
     *
     * @description
     * Creates an input group which hold a set of checkboxes and sets all of them as checked on page load.
     *
     * This directive expects ng-model to be an object.
     * Checkboxes should be a list of objects containing two fields 'label' and 'value'.
     * 'label' is a string which is displayed next to a checkbox and 'value' is a string which would be added to the ng-model when one selects a checkbox.
     *
     * @example
     * <input-filter-group checkboxes="checkboxes" ng-model="variable"></input-filter-group>
     *
     */

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