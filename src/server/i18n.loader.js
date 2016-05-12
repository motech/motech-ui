(function (){
    'use strict';

    angular.module('motech-server')
        .factory('i18nLoader', i18nLoader);

    i18nLoader.$inject = ['$q', '$http', 'ServerService'];
    function i18nLoader ($q, $http, ServerService) {

        return function(options){
            var deferred = $q.defer();

            $http.get(ServerService.formatURL('/module/server/lang/locate'))
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(){
                deferred.reject();
            });

            return deferred.promise;
        };
    }

})();