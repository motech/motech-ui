(function () {
    'use strict';

    angular.module('motech-auth')
        .controller('resetFormController', ResetFormController);

    ResetFormController.$inject = ['LoginModal', '$http', 'ResetPasswordModal'];
    function ResetFormController(LoginModal, $http, ResetPasswordModal) {

        this.backToLogin = backToLogin;
        function backToLogin(){
            ResetPasswordModal.close();
            LoginModal.open();
        }

        this.sendReset = sendReset;
        function sendReset(email) {
            return $http({method: "POST", url: "../server/forgot", data: email});
        }
    }
})();