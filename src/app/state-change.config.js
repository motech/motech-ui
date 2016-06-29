(function(){
    'use strict';

    angular.module('motech-dashboard')
        .config(cancelDefaultInterceptor)
        .run(appStateChangeInterceptor);
    

    function cancelDefaultInterceptor($urlRouterProvider){
      $urlRouterProvider.deferIntercept();
    }

    function appStateChangeInterceptor($rootScope, $urlRouter, AppStateService){
      
      $rootScope.$on('$locationChangeSuccess', function(event) {
        if (AppStateService.ready) return;
        event.preventDefault(); // Prevent $urlRouter's default handler from firing
     
        AppStateService.check()
        .then(function() {
          $urlRouter.sync(); // process $urlRouter's location
        });
      });
      
      $urlRouter.listen();
    }

})();