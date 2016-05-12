(function(){
    'use strict';

    angular.module('motech-common')
        .run(configRouteRedirect);

    configRouteRedirect.$inject = ['$rootScope', '$state'];
    function configRouteRedirect($rootScope, $state){
        $rootScope.$on('$stateChangeStart', function(evt, to, params) {
          if (to.redirectTo) {
            evt.preventDefault();
            if(to.redirectTo == $state.current.name){
                setTimeout(function(){
                    $rootScope.$broadcast('$stateChangeSuccess');
                }, 500);
            } else {
                $state.go(to.redirectTo, params, {location:"replace"});
            }
          }
        });
    }

})();