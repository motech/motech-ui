(function () {
    'use strict';

    /* MOTECH-DASHBOARD APP */
    angular
        .module('motech-dashboard', [
            'ui.router',
            'motech-auth',
            'motech-admin'
        ]);
})();