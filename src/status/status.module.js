(function () {
    'use strict';

    angular
        .module('motech-status', [
            'motech-common'
        ])
        .run(displayServerStatus);

    displayServerStatus.$inject = ['ServerStatusService']
    function displayServerStatus(ServerStatusService) {
        setTimeout(function () {
            ServerStatusService.getStatus();
        }, 500);
    }
})();