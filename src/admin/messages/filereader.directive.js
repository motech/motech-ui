(function () {
    'use strict';
        angular.module('motech-admin')
            .directive('filereader', function () {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.bind('change', function(e){
                        scope.$apply(function(){
                            scope[attrs.filereader](e.target.files[0]);
                        });
                    });
                }
            };
        });
})();