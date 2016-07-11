(function () {
    'use strict';

    angular.module('motech-admin')
        .config(adminRoutes);

    adminRoutes.$inject = ['$stateProvider'];
    function adminRoutes ($stateProvider) {
        $stateProvider
            .state('log', {
                url: '/log',
                ncyBreadcrumb: {
                    label: 'Server Log'
                },
                views:{
                secondaryNav: {
                    templateUrl: '/admin/log/nav.html'
                    }
                },
                redirectTo: 'log.file'
            })
            .state('log.file', {
                url: '/log-file',
                ncyBreadcrumb: {
                    label: 'admin.log.file'
                },
                views: {
                    'appArea@': {
                        templateUrl: '/admin/log/log-file.html',
                        controller: 'LogFileController'
                    }
                }
            })
            .state('log.options', {
                url: '/log-options',
                ncyBreadcrumb: {
                    label: 'admin.log.options'
                },
                views: {
                    'appArea@': {
                        templateUrl: '/admin/log/log-options.html',
                        controller: 'LogOptionsController'
                    }
                }
            });
    }

})();