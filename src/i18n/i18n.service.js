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
            var parameters = {};
            if(arguments.length > 1){
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                var indexedParameters = [];
                args.forEach(function(value){
                    if(Array.isArray(value)){
                        value.forEach(function(value){
                            indexedParameters.push(value);
                        });
                    } else if(typeof(value) == 'object'){
                        Object.keys(value).forEach(function(key){
                            parameters[key] = value[key];
                        });
                    } else {
                        indexedParameters.push(value);
                    }
                });
                indexedParameters.forEach(function(value, index){
                    parameters[index] = value;
                });
            }
            return $translate.instant(msg, parameters);
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