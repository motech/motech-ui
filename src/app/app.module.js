(function () {
    'use strict';

    /* MOTECH-DASHBOARD APP */
    angular
        .module('motech-dashboard', [
            'ui.router',
            'ncy-angular-breadcrumb',
            'motech-auth',
            'motech-email',
            'motech-scheduler',
            'motech-i18n',
            'motech-admin'
        ]);
})();