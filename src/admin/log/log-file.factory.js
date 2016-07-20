(function () {
    'use strict';

    angular.module('motech-admin')
        .factory('LogFileFactory', logFileFactory);

    logFileFactory.$inject = ['$q', '$http','ServerService'];
    function logFileFactory ($q, $http, ServerService ) {
        var service = {
            getLog: getLog
        };

        return service;

        function getLog () {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: ServerService.formatURL('/module/admin/api/log')
            }).then(function(response){
                service.log = response.data;
                deferred.resolve(response.data);
            }).catch(function(){
                deferred.reject([]);
            });

            return deferred.promise;
        }
    }

})();
