(function () {
    'use strict';

    angular.module('motech-server')
        .service('ServerService', motechServerService);

    motechServerService.$inject = ['$q', '$rootScope', 'MOTECH_SERVER_URL'];
    function motechServerService ($q, $rootScope, MOTECH_SERVER_URL) {
        var ready = false;

        var server = this;
        this.information = {};

        this.whenReady = whenReady;
        this.isReady = isReady;

        this.formatURL = formatUrl;
        this.isURL = checkServerUrl;

        $rootScope.$on('motechServer.loaded', function(){
            ready = true;
        });

        function formatUrl (uri) {
            if(uri.indexOf('/') == 0){
                return formatUrl(uri.substring(1));
            }
            return MOTECH_SERVER_URL + uri;
        }

        function checkServerUrl(url) {
            if(url.indexOf(MOTECH_SERVER_URL) == 0){
                return true;
            }
            return false;
        }

        function isReady() {
            if(ready){
                return true;
            }
            return false;
        }

        function whenReady() {
            if(isReady()){
                return $q.when(true);
            }
            var deferred = $q.defer();
            checkReady(deferred);
            return deferred.promise;
        }
        function checkReady(deferred) {
            if(isReady()){
                deferred.resolve(true);
            } else {
                setTimeout(function () {
                    checkReady(deferred);
                }, 500);
            }
        }

        return this;
    }

})();