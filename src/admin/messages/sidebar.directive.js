(function () {
    'use strict';
        angular.module('motech-admin')
        .directive('sidebar', function () {
            return function (scope, element, attrs) {
                $(element).sidebar({
                    position:"right"
                });
            };
        });
})();