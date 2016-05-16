(function(){
    'use strict';

    angular.module('motech-common')
        .run(modalInterceptor);

    modalInterceptor.$inject = ['$rootScope', 'LoadingModal'];
    function modalInterceptor ($rootScope, LoadingModal) {
        var loadingModalTimeout;
        $rootScope.$on('$stateChangeStart', function(){
            if(loadingModalTimeout){
                clearTimeout(loadingModalTimeout);
            }
            loadingModalTimeout = setTimeout(function(){
                LoadingModal.open();
            }, 500);
        });
        function modalClose(){
            clearTimeout(loadingModalTimeout);
            LoadingModal.close();
        }
        $rootScope.$on('$stateNotFound',modalClose);
        $rootScope.$on('$stateChangeSuccess',modalClose);
        $rootScope.$on('$stateChangeError',modalClose);
    }

})();