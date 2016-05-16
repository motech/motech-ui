(function(){
    'use strict';

    angular.module('motech-email')
        .service('EmailLogsService', logsService);

    logsService.$inject = ['ServerService', 'PagiableServiceFactory'];
    function logsService (ServerService, PagiableServiceFactory) {
        var emailUrl = ServerService.formatURL('module/email/emails');
        return PagiableServiceFactory(emailUrl);
    }

})();