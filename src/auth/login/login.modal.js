(function () {
    'use strict';

    angular.module('motech-auth')
        .service('LoginModal', LoginModal);

    LoginModal.$inject = ['$q', '$compile', '$rootScope', 'i18nService', 'ModalWindow'];
    function LoginModal ($q, $compile, $rootScope, i18nService, ModalWindow) {
        var modal = ModalWindow(
                $compile('<motech-login />')($rootScope),
                i18nService.getMessage('security.signInUser'),
                false);
        return {
            open: function () {
                var deferred = $q.defer();
                modal.open();
                return deferred.promise;
            },
            close: function(){
                modal.close();
            }
        };
    }

})();