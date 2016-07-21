(function(){
    'use strict';

    /**
     * @memberOf motech-common
     * @ngdoc directive
     * @name  InputFilter
     * @scope true
     *
     * @param { } ng-model Takes variable that contains an object.
     * @param { String } value Value of a checkbox which is added to the ng-model.
     * @param { String } label Label which is displayed next to a checkbox.
     *
     * @description
     * Creates a checkbox which is included in an input group.
     * A value of a checkbox is added to ng-model when one selects a checkbox and it is removed from ng-model when a certain checkbox is deselected.
     *
     * This directive expects ng-model to be an object.
     * 'label' is a string which is displayed next to a checkbox.
     * 'value' is a string which would be added to the ng-model when one selects a checkbox.
     *
     * @example
     * <input-filter label="label" ng-model="variable" value="value"></input-filter>
     *
     */

    angular.module('motech-common')
        .directive('inputFilter', inputFilterDirective);

    inputFilterDirective.$inject = [];
    function inputFilterDirective () {
        return {
            restrict: 'E',
            replace: true,
            require: '^^inputFilterGroup',
            scope: {
                 ngModel: "=",
                 value: "=",
                 label: "="
            },
            templateUrl: '/common/input-filter/input-filter.html'
        };
    }

})();