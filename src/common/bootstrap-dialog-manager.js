(function(){
    'use strict';

    angular.module('motech-common')
        .service('BootstrapDialogManager', manager);

    manager.$inject = ['LoadingModal', '$rootScope', '$timeout'];
    function manager (LoadingModal, $rootScope, $timeout) {
        var that = this, modalsList = [];

        LoadingModal.openEvent($rootScope, function(event) { that.hide(); });
        LoadingModal.closeEvent($rootScope, function(event) { that.show(); });

        this.open = function (dialog) {
            modalsList.push(dialog);
            if (modalsList.length > 1) {
                modalsList[modalsList.length-2].close();
            }
            if (!LoadingModal.isOpen()) {
                dialog.open();
            }
        };

        this.close = function (dialog) {
            dialog.close();
            that.remove(dialog);
            if (modalsList.length > 0) {
                modalsList[modalsList.length-1].open();
            }
        };

        this.remove = function (dialog) {
            var i, modalsListLength = modalsList.length;

            for (i = 0; i < modalsListLength; i += 1) {
                if (modalsList[i].options.id === dialog.options.id) {
                    modalsList.splice(i, 1);
                    break;
                }
            }
        };

        this.show = function () {
            if (modalsList.length > 0 && !LoadingModal.isOpen()) {
                modalsList[modalsList.length-1].open();
            } else if (modalsList.length > 0) {
                $timeout(function() {
                    that.show();
                }, 200);
            }
        };

        this.hide = function () {
            if (modalsList.length > 0) {
                modalsList[modalsList.length-1].close();
            }
        };
    }

})();
