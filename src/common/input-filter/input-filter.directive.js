(function(){
    'use strict';

    angular.module('motech-common')
        .directive('inputFilter', inputFilterDirective);

    inputFilterDirective.$inject = [];
    function inputFilterDirective () {
        return {
            element: 'EA',
            require: '?ngModel',
            templateUrl: '/common/input-filter/input-filter.html',
            controller: '',
            controllerAs: '',
            link: function (scope, element, attrs, ngModel) {
                if(attrs.title){
                    scope.title = attrs.title;
                }
            }
        };
    }

})();