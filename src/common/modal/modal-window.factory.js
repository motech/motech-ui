(function(){
    'use strict';

    angular.module('motech-common')
        .factory('ModalWindow', factory);

    factory.$inject = ['BootstrapDialog', 'BootstrapDialogManager'];
    function factory(BootstrapDialog, BootstrapDialogManager) {
        function ModalWindow(content, title, closable){
            if(!closable){
                closable = false;
            } else {
                closable = true;
            }

            var dialog = new BootstrapDialog({
                title: title,
                message: content,
                closable: closable
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