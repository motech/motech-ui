(function(){
    'use strict';
    /**
     * @memberOf motech-common
     * @ngdoc directive
     * @name  InputMap
     * @scope true
     *
     * @param { } ng-model Takes variable that contains an object
     *
     * @description
     * Creates an input that is able to recieve key-value pairs.
     *
     * This directive expects ng-model to be a dictionary of key-value paris.
     *
     * @example
     * <input-map ng-modal="variable"></input-map>
     * 
     */
    angular.module('motech-common')
        .directive('inputMap', mapInputDirective);

    mapInputDirective.$inject = [];
    function mapInputDirective () {
        return {
            element: 'EA',
            replace: true,
            require: '?ngModel',
            templateUrl: '/common/input-map/input-map.html',
            controller: 'InputMapController',
            controllerAs: 'InputMapCtrl',
            link: function (scope, element, attrs, ngModel) {
                if(attrs.title){
                    scope.title = attrs.title;
                }

                ngModel.$render = function(){
                    if(ngModel.$viewValue){
                        scope.InputMapCtrl.properties = ngModel.$viewValue;
                    }
                };

                scope.$watch('InputMapCtrl.properties', function(value){
                    ngModel.$setViewValue(value);
                }, true);

                scope.$on('input-map.added', function(){
                    scope.property = {};
                });

                scope.emptyFields = function (property) {
                    if (property === undefined) {
                        return true;
                    } else if (property.name === undefined || property.name === null || property.value === undefined || property.value === null) {
                        return true;
                    }
                    return false;
                };

            }
        };
    }
})();