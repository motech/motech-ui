(function () {
    'use strict';

    angular.module('motech-admin')
        .config(adminRoutes);

    adminRoutes.$inject = ['$stateProvider'];
    function adminRoutes ($stateProvider) {
        $stateProvider
        .state('topics', {
            url: '/topics',
            ncyBreadcrumb: {
                label: 'admin.topics'
            },
            views: {
                'appArea@': {
                    templateUrl: '/admin/topics/topics.html',
                    controller: 'TopicsController'
                },
                'secondaryNav@': {
                    templateUrl: '/admin/topics/nav.html'
                }
            }
        });
    }
})();