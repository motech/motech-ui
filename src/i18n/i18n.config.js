(function (){
    'use strict';

    angular.module('motech-server')
        .config(i18nSetLoader)
        .run(i18nSetMsg);

    i18nSetLoader.$inject = ['$translateProvider'];
    function i18nSetLoader ($translateProvider){
        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.preferredLanguage('en');
        $translateProvider.useLoader('i18nLoader');
    }

    i18nSetMsg.$inject = ['$rootScope','i18nService'];
    function i18nSetMsg($rootScope, i18nService){
        $rootScope.msg = function(msg){
            return i18nService.getMessage(msg);
        };
    }

})();