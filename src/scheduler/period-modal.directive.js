(function(){
    'use strict';

    angular.module('motech-scheduler')
        .directive('periodModal', periodModalDirective);

    periodModalDirective.$inject = ['$compile', '$timeout', '$http', '$templateCache'];
    function periodModalDirective ($compile, $timeout, $http, $templateCache) {
        var templateLoader;
        return {
            restrict: 'E',
            replace : true,
            transclude: true,
            compile: function (tElement, tAttrs, scope) {
                var url = 'scheduler/period-modal.html',

                templateLoader = $http.get(url, { cache: $templateCache })
                    .success(function (html) {
                        tElement.html(html);
                    });

                return function (scope, element, attrs) {
                    templateLoader.then(function () {
                        element.html($compile(tElement.html())(scope));
                    });
                };
            }
        };
    }
}());
