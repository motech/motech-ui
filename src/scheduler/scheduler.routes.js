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
                    templateUrl: '/scheduler.html',
                    controller: 'SchedulerController'
                }
            }
        });
    }

})();
