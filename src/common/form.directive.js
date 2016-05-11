(function () {
    'use strict';

    angular.module('motech-common')
        .directive('form', formDirective);

    function formDirective() {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                // Removed initial form validation logic created in HTML5
                // https://developer.mozilla.org/en/docs/Web/HTML/Element/form#attr-novalidate
                element.attr('novalidate', '');
            }
        }
    }

})();