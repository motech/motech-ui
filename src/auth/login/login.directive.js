(function () {
    'use strict';

    angular.module('motech-auth')
        .directive('motechLogin', LoginForm);

    function LoginForm() {
        return {
            restrict: 'EA',
            replace: true,
            scope:{},
            templateUrl: '/auth/login/login.html',
            controller: LoginFormController,
            controllerAs: 'LoginCtrl',
            link: LoginFormDirective
        };
    }

    LoginFormController.$inject = ['AuthService', 'ResetPasswordModal', 'LoginModal'];
    function LoginFormController (AuthService, ResetPasswordModal, LoginModal) {
        this.login = login;
        function login (username, password) {
            return AuthService.login(username, password);
        }

        this.forgotPassword = forgotPassword;
        function forgotPassword () {
            LoginModal.close();
            ResetPasswordModal.open();
        }
    }

    function LoginFormDirective (scope, element, attrs) {
        scope.doLogin = function () {
            delete scope.error;
            scope.LoginCtrl.login(scope.username, scope.password)
            .then(function(){
                scope.username = "";
                scope.password = "";
                scope.form.$setPristine();
            })
            .catch(function(message){
                scope.error = message;
            });
        };

        scope.forgot = function () {
            scope.LoginCtrl.forgotPassword();
        };
    }


})();