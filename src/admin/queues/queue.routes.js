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
            .state('queues.queue', {
                url: '/:queueName',
                ncyBreadcrumb: {
                    label: 'admin.queue.messages.pending'
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