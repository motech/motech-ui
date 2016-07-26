(function (){
    'use strict';

    angular.module('motech-server')
        .config(i18nSetLoader)
        .run(i18nSetMsg);

    i18nSetLoader.$inject = ['$translateProvider'];
    function i18nSetLoader ($translateProvider){
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
        $translateProvider.useInterpolation('i18nInterpolator');
        $translateProvider.preferredLanguage('en');
        $translateProvider.useLoader('i18nLoader');
    }

    i18nSetMsg.$inject = ['$rootScope','i18nService'];
    function i18nSetMsg($rootScope, i18nService){
        $rootScope.msg = i18nService.getMessage;
    }

})();