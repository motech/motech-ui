(function () {
    'use strict';

    angular.module('motech-server')
        .service('ServerStatusModal', statusModal)
        .run(statusModalListeners);

    statusModalListeners.$inject = ['$rootScope', 'ServerStatusService', 'ServerStatusModal'];
    function statusModalListeners($rootScope, ServerStatusService, ServerStatusModal) {
        var showTimeout;
        $rootScope.$on('motech.statusCheck.start', function(){
            showTimeout = setTimeout(function(){
                if(!ServerStatusService.isRunning()){
                    ServerStatusModal.open();
                }
            }, 500);
        });
        $rootScope.$on('motech.statusCheck.stop', function(){
            if(showTimeout){
                clearTimeout(showTimeout);
                showTimeout = undefined;
            }
            if(ServerStatusService.hasErrors()){
                ServerStatusModal.open();
            } else {
                ServerStatusModal.close();
            }
        });
    }

    statusModal.$inject = ['$q', '$compile', '$rootScope', 'BootstrapDialog', 'ServerStatusService'];
    function statusModal ($q, $compile, $rootScope, BootstrapDialog, ServerStatusService) {
        var modal = new BootstrapDialog({
            title: $compile('<span>{{ "server.welcome.startup" | translate }}</span>')($rootScope),
            message: $compile('<motech-server-status />')($rootScope),
            buttons: [],
            closable: false
        });

        this.open = showModal;
        this.close = hideModal;

        function showModal() {
            modal.open();
        }
        function hideModal() {
            modal.close();
        }

    }

})();