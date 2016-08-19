(function () {
    'use strict';

    angular
        .module('motech-auth')
        .run(authConfigHttp);

    authConfigHttp.$inject = ['$rootScope', 'LoginModal'];
    function authConfigHttp ($rootScope, LoginModal) {
        $rootScope.$on('event:auth-loginRequired', function() {
            LoginModal.open();
        });
        $rootScope.$on('event:auth-loginConfirmed', function() {
            LoginModal.close();
        });
    }
})();
