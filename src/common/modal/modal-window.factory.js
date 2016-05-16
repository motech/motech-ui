(function(){
    'use strict';

    angular.module('motech-common')
        .factory('ModalWindow', factory);

    factory.$inject = ['BootstrapDialog', 'BootstrapDialogManager'];
    function factory(BootstrapDialog, BootstrapDialogManager) {
        function ModalWindow(content, title, closeable){
            if(!closeable){
                closeable = false;
            } else {
                closeable = true;
            }

            var dialog = new BootstrapDialog({
                title: title,
                message: content,
                closeable: closeable
            });
            
            function openWindow(){
                BootstrapDialogManager.open(dialog);
            }
            function closeWindow(){
                BootstrapDialogManager.close(dialog);
            }

            return {
                open: openWindow,
                close: closeWindow
            };
        }
        return ModalWindow;
    }

})();