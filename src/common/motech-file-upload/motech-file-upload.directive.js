(function () {
    'use strict';

    angular.module('motech-common')
        .directive('motechFileUpload', motechFileUploadDirective);

    motechFileUploadDirective.$inject = ['$compile'];
    function motechFileUploadDirective($compile) {
        var templateLoader;

        return {
            restrict: 'E',
            transclude: false,
            templateUrl: '/common/motech-file-upload/motech-file-upload.html',
            link: function (scope, element, attrs) {
                var $input = element.find("#fileInput");
                if (attrs.accept) {
                    $input.attr('accept', attrs.accept);
                }
                if (attrs.file) {
                    $input.attr('motech-file-value', attrs.file);
                }
                element.html($compile(element.html())(scope));
            }
        };
    }
})();