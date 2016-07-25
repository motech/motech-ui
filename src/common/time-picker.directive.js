(function(){
    'use strict';

    angular.module('motech-common')
        .directive('timePicker', timePicker);

    function timePicker() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {
                var isReadOnly = scope.$eval(attr.ngReadonly);
                if(!isReadOnly) {
                    angular.element(element).timepicker({
                        onSelect: function (timeTex) {
                            ngModel.$setViewValue(timeTex);
                        }
                    });
                }
            }
        };
    }

})();