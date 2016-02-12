(function () {
    'use strict';

    angular
        .module('motech-auth', ['motech-common'])
        .run(['AuthService', checkAuth]);

    function checkAuth(AuthService){
        AuthService.checkAuth()
            .catch(function(){
                console.log('Need to login');
            });
    }
})();