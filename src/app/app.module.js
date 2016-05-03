(function () {
    'use strict';

    /* MOTECH-DASHBOARD APP */
    angular
        .module('motech-dashboard', [
            'ui.router',
            'ncy-angular-breadcrumb',
            'motech-auth',
            'motech-email',
            'motech-admin'
        ]);
})();