(function () {
    'use strict';

    angular.module('motech-server')
        .service('ServerStatusService', motechServerStatusService);

    motechServerStatusService.$inject = ['$q', '$rootScope', '$http', 'ServerService'];
    function motechServerStatusService ($q, $rootScope, $http, ServerService) {
        var service = this;

        this.running = false;
        this.started = false;
        this.errors = [];

        this.startedBundles = [];

        this.getStatus = getStatus;
        this.hasErrors = hasErrors;
        this.isRunning = isRunning;
        this.isLoaded = isLoaded;

        this.isBundleStarted = isBundleStarted;
        this.hasBundleError = hasBundleError;
        this.isBundleStarting = isBundleStarting;

        $rootScope.$on('motech.checkStatus', function(){
            getStatus();
        });

        function getStatus() {
            var deferred = $q.defer();
            $rootScope.$broadcast('motech.statusCheck.start');
            $http.get(ServerService.formatURL('server/bootstrap/status'))
            .then(function(response){
                service.running = true;
                service.startedBundles = response.data.startedBundles;
                service.osgiStartedBundles = response.data.osgiStartedBundles;
                service.startedPercentage = response.data.startupProgressPercentage;

                if(service.isLoaded()) {
                    deferred.resolve(true);
                } else {
                    deferred.notify(response.data.startupProgressPercentage);
                    setTimeout(getStatus, 2000);
                }
            }).catch(function(){
                if(!service.started && service.errors && service.errors.length < 1) {
                    service.errors.push("Could not reach MOTECH server");
                }
                deferred.reject(false);
            });

            deferred.promise.then(
                function(){ // Success
                    service.started = true;
                    $rootScope.$broadcast('motechServer.loaded');
                },
                function(){ // Error
                    service.started = false;
                    $rootScope.$broadcast('motechServer.errorLoading');
                },
                function(){ // Update
                    $rootScope.$broadcast('motech.statusCheck.update');
                }
            ).finally(function(){
                $rootScope.$broadcast('motech.statusCheck.stop');
            });
            return deferred.promise;
        }

        function isRunning () {
            if(service.running) {
                return true;
            }
            return false;
        }

        function isLoaded () {
            if(service.isRunning() && service.startedPercentage == 100) {
                return true;
            }
            return false;
        }

        function hasErrors () {
            if(service.errors.length > 0){
                return true;
            }
            return false;
        }

        function isBundleStarted(id) {
            if(service.startedBundles && service.startedBundles.indexOf(id) > -1) {
                return true;
            } else {
                return false;
            }
        }

        function isBundleStarting(id) {
            if(service.osgiStartedBundles && service.osgiStartedBundles.indexOf(id) > -1) {
                return true;
            } else {
                return false;
            }
        }

        function hasBundleError (id) {
            return false;
        }

    }

})();