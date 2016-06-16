(function () {
    'use strict';

    angular.module('motech-dashboard')
        .config(dashboardRoutes)
        .run(onMotechRefresh);

    dashboardRoutes.$inject = ['$urlRouterProvider'];
    function dashboardRoutes($urlRouterProvider) {
        $urlRouterProvider.otherwise("/bundles");
    }

    onMotechRefresh.$inject = ['$rootScope', '$state'];
    function onMotechRefresh($rootScope, $state){
    	$rootScope.$on('motech.refresh', function(){
            if($state.current && !$state.current.abstract){
                $state.go($state.current, {}, {reload: true});                
            }
    	});
    }

})();