(function () {
    'use strict';

    angular.module('motech-admin')
        .config(adminRoutes);

    adminRoutes.$inject = ['$stateProvider'];
    function adminRoutes ($stateProvider) {
        $stateProvider
        .state('settings', {
            url: '/settings',
            ncyBreadcrumb: {
                label: 'admin.settings'
            },
            views: {
                'appArea@': {
                    templateUrl: '/admin/settings/settings.html',
                    controller: 'SettingsController'
                },
                'secondaryNav@': {
                    templateUrl: '/admin/settings/nav.html'
                }
            }
        });
    }
})();