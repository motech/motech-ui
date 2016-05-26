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
                    if(jQuery('.app').hasClass("has-open-nav")){
                        hide();
                    } else {
                        show();
                    }
                });
                $rootScope.$on('$stateChangeStart', function(){
                    hide();
                });
                function show(){
                    jQuery('.app').addClass('has-open-nav');
                }
                function hide(){
                    jQuery('.app').removeClass('has-open-nav');
                }
            }
        };
    }

})();