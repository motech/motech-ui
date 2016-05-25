(function(){
    'use strict';

    angular.module('motech-common')
        .directive('motechListCollapsible', directive);

    directive.$inject = [];
    function directive () {
        return {
            restrict: 'EA',
            require: '^^motechList',
            replace: true,
            transclude: true,
            template: '<div class="motech-list-collapsible" ng-transclude></div>',
            link: linkFunction
        };
    }

    function linkFunction(scope, element, attrs, MotechListCtrl){
        MotechListCtrl.addCollapsibleColumn();
        element.addClass('motech-list-collapsible');
        var toggleButton = jQuery('<a ng-if="collapsible" class="list-item-collapsible-toggle">Toggle</a>');
        toggleButton.insertBefore(element);
        toggleButton.on('click', function(){
            if(element.hasClass('is-active')){
                element.removeClass('is-active');
                toggleButton.removeClass('is-active');
            } else {
                element.addClass('is-active');
                toggleButton.addClass('is-active');
            }
        });
    }

})();