(function () {
    'use strict';

    angular.module('motech-auth')
        .service('LoginModal', LoginModal);

    LoginModal.$inject = ['$q', '$compile', '$rootScope', 'BootstrapDialog'];
    function LoginModal ($q, $compile, $rootScope, BootstrapDialog) {
        var modal = new BootstrapDialog({
            title: 'Login',
            message: $compile('<motech-login />')($rootScope),
            buttons: [],
            closable: false            
        });
        return {
            open: function () {
                var deferred = $q.defer();
                modal.open();
                return deferred.promise;
            },
            close: function(){
                modal.close();
            }
        };
    }

})();