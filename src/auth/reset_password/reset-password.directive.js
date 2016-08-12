(function () {
    'use strict';

    angular.module('motech-auth')
        .directive('resetPassword', ResetPasswordForm);

    function ResetPasswordForm() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {},
            controller: 'resetFormController',
            templateUrl: '/auth/reset_password/reset-password.html',
            link: Reset_PasswordFormDirective
        };
    }

    function Reset_PasswordFormDirective (scope, element, attrs, controller) {
        scope.send = function () {
             if (scope.email !== "") {
                 controller.sendReset(scope.email)
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
            controller.backToLogin();
        };
    }
})();