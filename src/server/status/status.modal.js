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
                    ServerStatusModal.open('error');
                } else if (!ServerStatusService.isLoaded()) {
                    ServerStatusModal.open('loaded');
                } else if (ServerStatusService.hasErrors()){
                    ServerStatusModal.open('error');
                }
            }, 500);
        });
        $rootScope.$on('motech.statusCheck.stop', function(){
            if(showTimeout){
                clearTimeout(showTimeout);
                showTimeout = undefined;
            }
            if(ServerStatusService.hasErrors()){
                ServerStatusModal.open('error');
            } else {
                ServerStatusModal.close();
            }
        });
    }

    statusModal.$inject = ['$compile', '$rootScope', 'BootstrapDialog'];
    function statusModal ($compile, $rootScope, BootstrapDialog) {
        var title = 'Welcome Startup',
            type = 'type-primary',
            modal = new BootstrapDialog({
                type: type,
                title: title,
                message: $compile('<motech-server-status />')($rootScope),
                buttons: [],
                closable: false
            });

        this.open = showModal;
        this.close = hideModal;

        function showModal(args) {
            setOptions(args);
            modal.open();
        }

        function hideModal() {
            modal.close();
        }

        function setOptions(args) {
            if (args !== 'error') {
                title = 'Server Running';
                type = 'type-primary';
            } else {
                title = 'Server Error';
                type = 'type-danger';
            }
            modal.setTitle(title);
            modal.setType(type);
        }
    }

})();