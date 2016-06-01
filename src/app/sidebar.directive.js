(function(){
    'use strict';

    angular.module('motech-common')
        .directive('motechSidebar', motechSidebar);

    motechSidebar.$inject = ['$rootScope'];
    function motechSidebar ($rootScope) {
        return {
            restrict: 'EA',
            transclude: true,
            templateUrl: '/app/sidebar.html',
            replace: true,
            scope: {
                title: "@?"
            },
            link: function(scope, element, attrs) {
                element.appendTo('.app');
                jQuery('.app').addClass('has-sidebar');

                jQuery('body').on('click','.motech-sidebar-button', function(event){
                    event.preventDefault();
                    if(jQuery('.app').hasClass('has-open-sidebar')){
                        hide();
                    } else {
                        show();
                    }
                });
                element.on('click', 'header .close', function(event){
                    event.preventDefault();
                    hide();
                });
                $rootScope.$on('$stateChangeStart', function(){
                    hide();
                    jQuery('.app').removeClass('has-sidebar');
                    element.remove();
                });

                scope.$on('$destroy', function(){
                    jQuery('body').off('click','.motech-sidebar-button');
                });

                function show(){
                    jQuery('.app').addClass('has-open-sidebar');
                }
                function hide(){
                    jQuery('.app').removeClass('has-open-sidebar');
                }
            }
        };
    }

})();