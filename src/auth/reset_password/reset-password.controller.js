(function () {
    'use strict';

    angular.module('motech-auth')
        .controller('resetFormController', ResetFormController);

    ResetFormController.$inject = ['LoginModal', '$http', 'ResetPasswordModal', 'ServerService'];
    function ResetFormController(LoginModal, $http, ResetPasswordModal, ServerService) {

        var forgotURL =  ServerService.formatURL('/module/server/forgot');

        this.backToLogin = backToLogin;
        function backToLogin(){
            ResetPasswordModal.close();
            LoginModal.open();
        }

        this.sendReset = sendReset;
        function sendReset(email) {
            var promise = $http({
            method: "POST",
            url: forgotURL,
            data: email,
            transformResponse: [function(data){
                return data;
            }]});
            return promise;
        }
    }
})();