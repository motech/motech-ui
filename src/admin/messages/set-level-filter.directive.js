(function () {
    'use strict';
        angular.module('motech-admin')
            .directive('setLevelFilter', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var elm = angular.element(element), attribute = attrs;
                    elm.click(function (e) {
                        if (elm.children().hasClass("fa-check-square-o")) {
                            $(this).children().removeClass('fa-check-square-o').addClass('fa-square-o');
                            $(this).removeClass('active');
                        }
                        else {
                            elm.children().addClass('fa-check-square-o').removeClass('fa-square-o');
                            elm.addClass('active');
                        }
                    });
                }
            };
        });
})();