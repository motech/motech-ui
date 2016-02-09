(function () {
    'use strict';

    angular
        .module('motech-auth')
        .factory('authHttpInterceptor', ['$rootScope', authHttpInterceptor])
        .config(['$httpProvider', authConfigHttp]);

    function authHttpInterceptor ($rootScope) {
        return {
            'request': function (config) {
                // if no login
                // call login event
            },
            'responseError': function (config) {
                // if Error && no Login
                // call login event
            }
        }
    }

    function authConfigHttp ($httpProvider) {
        $httpProvider.interceptors.push('authHttpInterceptor');
    }
})();