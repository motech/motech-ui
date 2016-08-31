(function(){
    'use strict';

    angular.module('motech-tasks')
        .config(tasksRoutes);

    tasksRoutes.$inject = ['$stateProvider'];
    function tasksRoutes ($stateProvider) {
        $stateProvider
        .state('tasks', {
            url: '/tasks',
            ncyBreadcrumb: {
                label: 'tasks'
            },
            views:{
                secondaryNav: {
                    templateUrl: '/tasks/nav.html'
                }
            },
            redirectTo: 'tasks.settings'
        })
        .state('tasks.settings', {
            url: '/settings',
            ncyBreadcrumb: {
                label: 'task.settings.title'
            },
            views:{
                'appArea@': {
                    templateUrl: '/tasks/settings.html',
                    controller: 'TasksSettingsController as SettingsCtrl',
                    resolve: {
                        'tasksSettings': tasksSettingsResolver
                    }
                }
            }
        });
    }

    tasksSettingsResolver.$inject = ['$q', 'TasksSettingsFactory'];
    function tasksSettingsResolver ($q, TasksSettingsFactory){
        var deferred = $q.defer();
        TasksSettingsFactory.get(function(data){
            deferred.resolve(data);
        });
        return deferred.promise;
    }

})();
