(function(){
    'use strict';

    angular.module('motech-tasks')
        .factory('TasksSettingsFactory', tasksSettingsFactory);

    tasksSettingsFactory.$inject = ['$resource', 'ServerService'];
    function tasksSettingsFactory ($resource, ServerService) {
        return $resource(ServerService.formatURL('module/tasks/api/settings'));
    }

})();
