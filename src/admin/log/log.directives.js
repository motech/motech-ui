(function(){
    'use strict';

    angular.module('motech-admin')
        .directive('logContent', logContent)
        .directive('gotoAnchor', gotoAnchor);

    function logContent () {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var elem = angular.element(element);

                scope.$watch('log', function( newValue, oldValue ) {
                    if (newValue !== oldValue) {
                        if (newValue === 'server.tomcat.error.logFileNotFound') {
                            elem.html(scope.msg(newValue));
                        } else {
                            elem.html(newValue);
                        }
                    }
                });
            }
        };
    }

    function gotoAnchor () {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var elem = angular.element(element),
                    elementId = attrs.gotoAnchor;

                elem.on('click', function() {
                    jQuery('html, body').animate({scrollTop: (jQuery('#' + elementId).offset().top - 100)}, 500);
                });
            }
        };
    }

})();
