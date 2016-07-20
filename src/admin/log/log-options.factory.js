(function () {
    'use strict';

    angular.module('motech-admin')
        .factory('LogOptionsFactory', logOptionsFactory);

    logOptionsFactory.$inject = ['$resource','ServerService', 'BootstrapDialog'];
    function logOptionsFactory ($resource, ServerService) {
        return $resource(ServerService.formatURL('/module/admin/api/log/level'));
    }

})();