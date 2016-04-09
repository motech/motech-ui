(function(){
	'use strict';

	angular.module('motech-common')
		.run(modalInterceptor)

    modalInterceptor.$inject = ['$rootScope', 'LoadingModal'];
    function modalInterceptor ($rootScope, LoadingModal) {
    	$rootScope.$on('$stateChangeStart', function(){
    		LoadingModal.open();
    	});
    	function modalClose(){
    		LoadingModal.close();
    	}
    	$rootScope.$on('$stateNotFound',modalClose);
    	$rootScope.$on('$stateChangeSuccess',modalClose);
    	$rootScope.$on('$stateChangeError',modalClose);
    }

})();