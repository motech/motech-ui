(function(){
    'use strict';

    angular.module('motech-email')
        .controller('EmailSendController', sendEmailController);

    sendEmailController.$inject = ['$scope', 'EmailSendService', 'ModalFactory', 'i18nService'];
    function sendEmailController ($scope, EmailSendService, ModalFactory, i18nService) {
        $scope.mail = {};

        $scope.sendEmail = sendEmail;

        function sendEmail () {
            if ($scope.mail.subject === undefined || $scope.mail.subject.length < 1) {
                ModalFactory.showConfirm(
                    i18nService.getMessage('email.messageEmptySubject'),
                    false,
                    function(result){
                        if(result){
                            doSendEmail();
                        }
                    });
            } else {
                doSendEmail();
            }
        }
        function doSendEmail(){
            EmailSendService.send($scope.mail)
            .then(function () {
                $scope.mail = {};
                $scope.emailForm.$setPristine();
                ModalFactory.showAlert('email.sent', 'email.header.success');
            })
            .catch(function (response) {
                ModalFactory.showErrorWithStackTrace('server.error', 'email.header.error', response);
            });
        }
    }

})();