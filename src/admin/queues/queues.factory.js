(function () {
    'use strict';

    angular.module('motech-admin')
        .factory('QueuesFactory', queuesFactory);

    queuesFactory.$inject = ['$resource', '$http', 'ServerService'];
    function queuesFactory ($resource, $http, ServerService) {
        return $resource(ServerService.formatURL('/module/admin/api/queues/'));
    }

})();
