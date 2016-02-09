(function () {
    'use strict';

    angular
        .module('motech-auth', [
            'motech-common',
            'motech-server'
        ]).run(showLoginModal);

    showLoginModal.$inject = ['LoginModal'];
    function showLoginModal(LoginModal) {
    	LoginModal.show();
    }
})();