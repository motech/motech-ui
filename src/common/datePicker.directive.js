(function(){
    'use strict';

    angular.module('motech-common')
        .directive('datePicker', datePicker);

    function datePicker() {
        return {
            restrict: 'A',
            scope: {
                min: "=?",
                max: "=?",
                parsed: "=?"
            },
            link: datePickerLink
        };
    }

    function datePickerLink(scope, element, attrs, ngModel) {
        element.datetimepicker({
            dateFormat: 'yy-mm-dd',
            timeFormat: 'HH:mm:ss',
            changeMonth: true,
            changeYear: true,
            beforeShow: function() {
                if (scope.min) {
                    var parts = scope.min.split(' ');
                    element.datetimepicker('option', 'minDate', parts[0]);
                }
                if (scope.max) {
                    var parts = scope.max.split(' ');
                    element.datetimepicker('option', 'maxDate', parts[0]);
                }
            },
            onSelect: function() {
                scope.$apply(function() {
                    scope.parsed = moment(element.datetimepicker('getDate')).format("YYYY-MM-DDTHH:mm:ssZZ");
                });
            }
        });
    }

})();