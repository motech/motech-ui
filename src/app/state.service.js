(function(){
    'use strict';

    angular.module('motech-dashboard')
        .service('AppStateService', stateService);

    stateService.$inject = ['$q', '$rootScope', 'AuthService', 'ServerService', 'i18nService'];
    function stateService ($q, $rootScope, AuthService, ServerService, i18nService) {
        $rootScope.$on('motech.refresh', refreshReady);

        function refreshReady(){
            $q.all({
                authenticated: AuthService.getCurrentUser(),
                server: ServerService.whenReady(),
                i18n: i18nService.getLanguages()
            })
            .then(function(){
                $rootScope.$broadcast('motech.app.ready');
            });
        }
    }

})();