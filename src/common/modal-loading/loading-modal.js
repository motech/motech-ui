(function(){
    'use strict';

    angular.module('motech-common')
        .service('LoadingModal', loadingModal);

    loadingModal.$inject = ['$rootScope', 'BootstrapDialog'];
    function loadingModal ($rootScope, BootstrapDialog) {
        var dialog, open = false;

        this.open = function () {
            if (!open) {
                dialog = new BootstrapDialog({
                    message: function(dialogRef) {
                        var $message = $('<div></div>'),
                        pageToLoad = dialog.getData('pageToLoad');
                        $message.load(pageToLoad);

                        return $message;
                    },
                    data: {
                        'pageToLoad': '/common/modal-loading/loadingModal.html'
                    },
                    closable: false,
                    draggable: false
                });

                dialog.realize();
                dialog.getModalHeader().hide();
                dialog.getModalFooter().hide();
                dialog.getModalContent().addClass('loading-modal');
                dialog.getModalContent().css('margin-top', '40%');
                dialog.getModalBody().css('padding', '0');

                dialog.open();
                open = true;
                $rootScope.$emit('loadingModalOpen');
            }
        };

        this.close = function () {
            if (open) {
                dialog.close();
                $rootScope.$emit('loadingModalClose');
            }
            open = false;
        };

        this.isOpen = function () {
            return open;
        };

        this.openEvent = function (scope, callback) {
            var handler = $rootScope.$on('loadingModalOpen', callback);
            scope.$on('$destroy', handler);
        };

        this.closeEvent = function (scope, callback) {
            var handler = $rootScope.$on('loadingModalClose', callback);
            scope.$on('$destroy', handler);
        };
    }

})();