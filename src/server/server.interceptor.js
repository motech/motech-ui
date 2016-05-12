(function () {
    'use strict';

    angular.module('motech-server')
        .factory('motechServerHTTPInterceptor', serverInterceptor)
        .config(httpConfig);

    serverInterceptor.$inject = ['MOTECH_SERVER_URL'];  
    function serverInterceptor (MOTECH_SERVER_URL) {
        return {
            request: function(config) {
                if(config.url.indexOf(MOTECH_SERVER_URL) === 0) {
                    config.withCredentials = true;
                    config.headers['X-Requested-With'] = 'XMLHttpRequest';
                    if (config.headers['Content-Type'] == 'application/x-www-form-urlencoded; charset=UTF-8' && config.data){
                        config.data = jQuery.param(config.data);
                    }
                }
                return config;
            }
        };
    }

    httpConfig.$inject = ['$httpProvider'];
    function httpConfig ($httpProvider) {
        $httpProvider.interceptors.push('motechServerHTTPInterceptor');
    }
})();