(function(){
    'use strict';

    angular.module('motech-common')
        .directive('select', directive);

    function directive(){
        return {
            restrict: 'E',
            link: function(scope, element, attr){
                element.addClass('form-control');
            }
        };
    }

})();