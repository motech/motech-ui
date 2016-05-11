(function(){
    'use strict';

    angular.module('motech-dashboard')
        .service('AppStateService', stateService);

    stateService.$inject = ['$q', '$rootScope', 'AuthService', 'ServerService'];
    function stateService ($q, $rootScope, AuthService, ServerService) {
        $rootScope.$on('motech.refresh', refreshReady);

        function refreshReady(){
            $q.all({
                authenticated: AuthService.getCurrentUser(),
                server: ServerService.whenReady()
            })
            .then(function(){
                $rootScope.$broadcast('motech.app.ready');
            });
        }
    }

})();