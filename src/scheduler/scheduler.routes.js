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
                label: 'scheduler'
            },
            views:{
                'appArea@': {
                    templateUrl: 'scheduler/job-list.html',
                    controller: 'JobListController'
                },
                secondaryNav: {
                    templateUrl: '/scheduler/nav.html'
                }
            }
        })
        .state('scheduler.createOrUpdateJob', {
            url: "/createOrUpdateJob?action?currJob",
            ncyBreadcrumb: {
                label: 'scheduler.scheduleJob'
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
