(function () {
    'use strict';

    angular.module('motech-common')
        .directive('appNav', directive);

    directive.$inject = ['$rootScope'];
    function directive($rootScope){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                jQuery('.app-nav-button').on('click', function(event){
                    event.preventDefault();
                    if(jQuery('.app').hasClass("has-nav")){
                        hide();
                    } else {
                        show();
                    }
                });

                jQuery('body').on('click', '.app-nav-backdrop', function(event){
                    event.preventDefault();
                    hide();
                });
                $rootScope.$on('$stateChangeStart', function(){
                    hide();
                });
                function show(){
                    jQuery('.app').addClass('has-nav');
                }
                function hide(){
                    jQuery('.app').removeClass('has-nav');
                }
            }
        };
    }

})();