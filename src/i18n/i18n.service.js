(function(){
    'use strict';

    angular.module('motech-server')
        .service('i18nService', service);

    service.$inject = ['$q', '$http', 'ServerService', '$translate'];
    function service ($q, $http, ServerService, $translate) {
        var languages = [];
        var currentLanguage = false;

        this.currentLanguage = currentLanguage;
        this.getCurrentLanguage = getCurrentLanguage;
        this.languages = languages;
        this.getMessage = getMessage;
        this.getLanguages = getLanguages;
        this.setLanguage = setLanguage;

        function getMessage(msg){
            return $translate.instant(msg);
        }

        function getLanguages(){
            var deferred = $q.defer();
            $q.all({
                list: $http.get(ServerService.formatURL('/module/server/lang/list')),
                current: $http.get(ServerService.formatURL('/module/server/lang'))
            })
            .then(function(response){
                var current = response.current.data;
                var langObj = response.list.data;
                languages = [];
                for(var key in langObj){
                    var lang = {
                        key: key,
                        name: langObj[key],
                        current: key == current
                    };
                    languages.push(lang);
                    if(lang.current){
                        currentLanguage = lang;
                    }
                }
                deferred.resolve(languages);
            }).catch(function(){
                deferred.reject();
            });
            return deferred.promise;
        }

        function getCurrentLanguage(){
            return currentLanguage;
        }

        function setLanguage(language){
            var deferred = $q.defer();
            $http.post(ServerService.formatURL('/module/server/userlang'),{
                language: language
            }).then(function(){
                return $translate.use(language); // triggers i18n.loader
            }).then(function(){
                deferred.resolve();
            });
            return deferred.promise;
        }

        return this;
    }
    
})();