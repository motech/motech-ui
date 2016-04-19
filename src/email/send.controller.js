(function(){
	'use strict';

	angular.module('motech-email')
		.controller('EmailSendController', sendEmailController);

	sendEmailController.$inject = ['$scope', 'EmailSendService', 'BootstrapDialog'];
	function sendEmailController ($scope, EmailSendService, BootstrapDialog) {
		$scope.mail = {};
        $scope.msg = function(str){
            return str;
        }

        $scope.sendEmail = sendEmail;

        function sendEmail () {
            if ($scope.mail.subject === undefined || $scope.mail.subject.length < 1) {
                BootstrapDialog.confirm({
                    message: $scope.msg('email.messageEmptySubject'),
                    btnOKLabel: 'email.btn.sendWithoutSubject',
                    btnOKClass: 'button-primary',
                    callback: function(result){
                        if(result){
                            doSendEmail();
                        }
                    }});
            } else {
                doSendEmail();
            }
        };
        function doSendEmail(){
            EmailSendService.send($scope.mail)
                .then(function () {
                    $scope.mail = {};
                    BootstrapDialog.alert({
                        title: 'email.header.success',
                        message: 'email.sent'
                    });
                })
                .catch(function (response) {
                    BootstrapDialog.alert({
                        title: 'email.header.error',
                        message: 'server.error'
                    });
                    //handleWithStackTrace('email.header.error', 'server.error', response);
                });
        }
	}

})();