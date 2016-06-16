(function(){
    'use strict';

    angular.module('motech-server')
        .factory('i18nModal', modal);

    modal.$inject = ['$rootScope', '$compile', 'i18nService', 'BootstrapDialog'];
    function modal($rootScope, $compile, i18nService, BootstrapDialog){
        var modal = false;

        $rootScope.$on('motech.refresh', closeModal);

        function openModal (){
            modal = new BootstrapDialog({
                message: $compile('<motech-i18n-form></motech-i18n-form>')($rootScope.$new())
            });
            modal.open();
        }
        function closeModal (){
            if(modal){
                modal.close();
            }
        }

        return {
            open: openModal,
            close: closeModal
        };
    }

})();