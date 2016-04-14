(function(){
	'use strict';

	angular.module('motech-email')
		.controller('EmailSendCtrl', sendEmailController);

	sendEmailController.$inject = ['$scope', 'EmailSendService'];
	function sendEmailController ($scope, EmailSendService) {
        console.log("Hello from sendEmailController");
		$scope.mail = {};
        $scope.msg = function(str){
            return str;
        }

        $scope.sendEmail = function () {
            if ($scope.mail.subject === undefined || $scope.mail.subject.length < 1) {
                $('#sendEmailWarning').modal('show');
            } else {
                EmailSendService.save(
                    {},
                    $scope.mail,
                    function () {
                        motechAlert('email.header.success', 'email.sent');
                    },
                    function (response) {
                        handleWithStackTrace('email.header.error', 'server.error', response);
                    }
                );
            }
        };

        $scope.sendEmailWithoutSubject = function () {
            $('#sendEmailWarning').modal('hide');
            EmailSendService.save(
                {},
                $scope.mail,
                function () {
                    motechAlert('email.header.success', 'email.sent');
                },
                function (response) {
                    handleWithStackTrace('email.header.error', 'server.error', response);
                }
            );
        };

        $scope.cancelSendingEmail = function () {
            $('#sendEmailWarning').modal('hide');
        };
	}

})();