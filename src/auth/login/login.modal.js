(function () {
    'use strict';

    angular.module('motech-auth')
        .service('LoginModal', LoginModal);

    LoginModal.$inject = ['$compile', '$rootScope', 'ModalWindow'];
    function LoginModal ($compile, $rootScope, ModalWindow) {
        var modal = ModalWindow(
            $compile('<motech-login />')($rootScope),
            $compile('<span>{{ "security.signInUser" | translate}}</span>')($rootScope),
            false);
        return {
            open: function () {
                modal.open();                    
            },
            close: function(){
                modal.close();
            }
        };
    }

})();