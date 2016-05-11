(function(){
    'use strict';

    angular.module('motech-email')
        .factory('EmailSendService', emailSendService);

    emailSendService.$inject = ['$http', 'ServerService'];
    function emailSendService ($http, ServerService) {
        var sendURL = ServerService.formatURL('/module/email/send')
        this.send = sendEmail;

        function sendEmail (message) {
            var promise = $http.post(sendURL, message)
            return promise;
        }


        return this;
    }
    
})();