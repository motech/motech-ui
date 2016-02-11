(function () {
    'use strict';

    angular
        .module('motech-auth')
        .factory('authHttpInterceptor', authHttpInterceptor)
        .config(['$httpProvider', authConfigHttp]);

    authHttpInterceptor.$inject = ['$q', '$rootScope'];
    function authHttpInterceptor ($q, $rootScope) {
        return {
            'request': function (config) {
                // if no login
                // call login event
                return config;
            },
            'responseError': function (rejection) {
                // if Error && no Login
                // call login event
                return $q.reject(rejection);
            }
        }
    }

    function authConfigHttp ($httpProvider) {
        $httpProvider.interceptors.push('authHttpInterceptor');
    }
})();