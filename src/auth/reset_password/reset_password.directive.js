(function () {
    'use strict';

    angular.module('motech-auth')
        .directive('motechResetpassword', ResetPasswordForm);

    function ResetPasswordForm() {
        return {
            restrict: 'EA',
            replace: true,
            scope:{},
            templateUrl: '/auth/reset_password/reset_password.html',
            controller: ResetFormController,
            controllerAs: 'ResetCtrl',
            link: Reset_PasswordFormDirective
        };
    }

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

    function Reset_PasswordFormDirective (scope, element, attrs) {
        scope.send = function () {
             if (scope.email !== "") {
                 scope.ResetCtrl.sendReset(scope.email)
                     .success(function (response) {
                        scope.error=response;
                        scope.emailGetter=false;
                        scope.processed=true;
                     })
                     .error(function (response) {
                        scope.error = 'security.tokenSendError';
                     });
             }
        };

        scope.back = function () {
            scope.ResetCtrl.backToLogin();
        };
    }


})();