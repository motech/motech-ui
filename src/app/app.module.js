(function () {
    'use strict';

    /* MOTECH-DASHBOARD APP */
    angular
        .module('motech-dashboard', [
            'ui.router',
            'motech-auth',
            'motech-email',
            'motech-scheduler',
            'motech-tasks',
            'motech-i18n',
            'motech-admin'
        ]);
})();
