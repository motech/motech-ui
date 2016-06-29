(function(){
    'use strict';

    angular.module('motech-dashboard')
        .service('AppStateService', stateService);

    stateService.$inject = ['$q', '$rootScope', 'AuthService', 'ServerService', 'i18nService'];
    function stateService ($q, $rootScope, AuthService, ServerService, i18nService) {
        var service = this;

        service.ready = false;
        service.check = checkAppReady;

        $rootScope.$on('motech.refresh', checkAppReady);

        function checkAppReady(){
            var deferred = $q.defer();
            service.ready = false;

            ServerService.whenReady()
            .then(function(){
                return $q.all([
                    i18nService.getLanguages(),
                    AuthService.getCurrentUser()
                    ]);
            })
            .then(function(){
                service.ready = true;
                $rootScope.$broadcast('motech.app.ready');
                deferred.resolve();
            });

            return deferred.promise;
        }
    }

})();