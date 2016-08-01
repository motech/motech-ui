(function () {
    'use strict';

    angular.module('motech-auth')
        .service('ResetPasswordModal', ResetPasswordModal);

    ResetPasswordModal.$inject = ['$compile', '$rootScope', 'ModalWindow'];
    function ResetPasswordModal ($compile, $rootScope, ModalWindow) {
        var modal;
        return {
            open: function () {
                modal = ModalWindow(
                    $compile('<reset-password />')($rootScope),
                    $compile('<span>{{ "security.enterEmailQuestions" | translate}}</span>')($rootScope),
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