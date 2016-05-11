(function(){
    'use strict'

    angular.module('motech-server')
        .factory('i18nModal', modal);

    modal.$inject = ['$rootScope', '$compile', 'i18nService', 'BootstrapDialog'];
    function modal($rootScope, $compile, i18nService, BootstrapDialog){
        var modal = new BootstrapDialog({
            message: $compile('<motech-i18n-form></motech-i18n-form>')($rootScope.$new())
        });

        $rootScope.$on('motech.refresh', closeModal);

        function openModal (){
            modal.open();
        }
        function closeModal (){
            modal.close();
        }

        return {
            open: openModal,
            close: closeModal
        };
    }

})();