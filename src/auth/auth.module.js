(function () {
    'use strict';

    angular
        .module('motech-auth', [
            'http-auth-interceptor',
            'motech-common',
            'motech-i18n',
            'motech-server'
        ]);
})();