(function () {
    'use strict';

    angular.module('motech-auth')
        .service('LoginModal', LoginModal);

    LoginModal.$inject = ['$compile', '$rootScope', 'ModalWindow'];
    function LoginModal ($compile, $rootScope, ModalWindow) {
        var modal;
        return {
            open: function () {
                modal = ModalWindow(
                    $compile('<motech-login />')($rootScope),
                    $compile('<span>{{ "security.signInUser" | translate}}</span>')($rootScope),
                    false);
                modal.open();
            },
            close: function(){
                if(modal){
                    modal.close();
                    modal = false;
                }
            }
        };
    }

})();
