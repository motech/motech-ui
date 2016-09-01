(function(){
    'use strict';

    angular.module('motech-scheduler')
        .directive('periodValidity', periodValidityDirective);

    function periodValidityDirective () {
        var PERIOD_REGEXP = /^P([0-9]+Y|)?([0-9]+M|)?([0-9]+W|)?([0-9]+D)?(T([0-9]+H)?([0-9]+M)([0-9]+S)|T([0-9]+H)?([0-9]+M)?([0-9]+S)|T([0-9]+H)?([0-9]+M)([0-9]+S)?|T([0-9]+H)([0-9]+M)([0-9]+S)|T([0-9]+H)([0-9]+M)?([0-9]+S)?|T([0-9]+H)([0-9]+M)([0-9]+S)?)?$/;
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (viewValue === '' || PERIOD_REGEXP.test(viewValue)) {
                        // it is valid
                        ctrl.$setValidity('period', true);
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('period', false);
                        return undefined;
                    }
                });
            }
        };
    }
}());
