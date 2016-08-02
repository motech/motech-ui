(function () {
    'use strict';

    angular.module('motech-common')
        .directive('motechFileUpload', motechFileUploadDirective);

    motechFileUploadDirective.$inject = ['$compile', '$timeout', '$http', '$templateCache'];
    function motechFileUploadDirective($compile, $timeout, $http, $templateCache) {
        var templateLoader;

        return {
            restrict: 'E',
            replace : true,
            transclude: false,
            compile: function (tElement, tAttrs, scope) {
                var url = '/common/motech-file-upload/motech-file-upload.html',

                templateLoader = $http.get(url, {cache: $templateCache})
                    .success(function (html) {
                        tElement.html(html);
                    });

                return function (scope, element, attrs) {
                    templateLoader.then(function () {
                        var $input = element.find("#fileInput");
                        if (attrs.accept) {
                            $input.attr('accept', attrs.accept);
                        }
                        element.html($compile(tElement.html())(scope));
                    });
                };
            }
        };
    }
})();