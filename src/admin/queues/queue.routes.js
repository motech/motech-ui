(function () {
    'use strict';

    angular.module('motech-admin')
        .config(adminRoutes);

    adminRoutes.$inject = ['$stateProvider'];
    function adminRoutes ($stateProvider) {
        $stateProvider
            .state('queues', {
                url: '/queues',
                ncyBreadcrumb: {
                    label: 'admin.queue.statistics'
                },
                views: {
                    'appArea@': {
                        templateUrl: '/admin/queues/queues-list.html',
                        controller: 'AdminQueueStatsCtrl'
                    },
                    'secondaryNav@': {
                        templateUrl: '/admin/queues/nav.html'
                    }
                }
            })
            .state('queue', {
                url: '/queue',
                ncyBreadcrumb: {
                    label: 'cos tam'
                },
                views: {
                    'appArea@': {
                        templateUrl: '/admin/queues/queue.html',
                        controller: 'QueueController'
                    }
                }
            });
    }
})();