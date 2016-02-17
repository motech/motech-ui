(function () {
    'use strict';

    angular
        .module('motech-auth', [
            'motech-common'
        ]).run(checkAuth);

    checkAuth.$inject = ['AuthService', 'LoginModal'];
    function checkAuth (AuthService, LoginModal) {
    	AuthService.check()
		.catch(function () {
			return LoginModal.show()
		});
    }
})();