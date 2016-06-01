(function(){
    'use strict';

    angular.module('motech-scheduler')
        .config(schedulerRoutes);

    schedulerRoutes.$inject = ['$stateProvider'];
    function schedulerRoutes ($stateProvider) {
        $stateProvider
        .state('scheduler', {
            url: '/scheduler',
            ncyBreadcrumb: {
                label: 'Scheduler'
            },
            views:{
                'appArea@': {
                    templateUrl: 'scheduler/scheduler.html',
                    controller: 'SchedulerController'
                },
                secondaryNav: {
                    templateUrl: '/scheduler/nav.html'
                }
            }
        })
        .state('scheduler.createOrUpdateJob', {
            url: "/createOrUpdateJob?action",
            ncyBreadcrumb: {
                label: 'ScheduleJob'
            },
            views: {
                'appArea@': {
                    templateUrl: '../scheduler/create-or-update-job.html',
                    controller: 'CreateOrUpdateJobController'
                }
            }
        });
    }

})();
