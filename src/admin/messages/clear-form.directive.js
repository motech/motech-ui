(function () {
    'use strict';
        angular.module('motech-admin')
            .directive('clearForm', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    $(element).on('hidden', function () {
                        $('#' + attrs.clearForm).clearForm();
                    });
                }
            };
        });
})();