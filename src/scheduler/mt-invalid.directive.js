(function(){
    'use strict';

    angular.module('motech-scheduler')
        .directive("mtInvalid", function() {
        return {
            restrict: 'A',
            scope: {
                mtInvalid: '='
            },
            link: function (scope, element, attrs) {
                scope.$watch("$parent." + scope.mtInvalid, function (value) {
                    if (value === true) {
                        element.addClass("text-danger");
                    } else {
                        element.removeClass("text-danger");
                    }
                });
            }
        };
    });

}());
