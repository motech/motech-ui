(function (){
    'use strict';

    angular.module('motech-server')
        .factory('i18nLoader', i18nLoader);

    i18nLoader.$inject = ['$q', '$http', 'ServerService', 'i18nService'];
    function i18nLoader ($q, $http, ServerService, i18nService) {

        function getLang(URL){
            var deferred = $q.defer();

            $http.get(URL)
            .then(function(response){
                deferred.resolve(response.data);
            })
            .catch(function(){
                deferred.resolve({});
            });            

            return deferred.promise;
        }

        return function(){
            var deferred = $q.defer();

            i18nService.getLanguages()
            .then(function(){
                var currentLang = i18nService.getCurrentLanguage();
                $q.all({
                    server: getLang(ServerService.formatURL('/module/server/lang/locate')),
                    local: getLang('i18n-messages/motech-messages.'+currentLang.key+'.json')
                }).then(function(response){
                    deferred.resolve(angular.extend(response.server, response.local));
                });
            });
            
            return deferred.promise;
        };
    }

})();