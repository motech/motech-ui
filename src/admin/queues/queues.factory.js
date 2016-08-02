(function () {
    'use strict';

    angular.module('motech-admin')
        .factory('QueuesFactory', queuesFactory);

    queuesFactory.$inject = ['$rootScope', '$resource', 'ServerService'];
    function queuesFactory ($rootScope, $resource, ServerService) {
        return $resource(ServerService.formatURL('/module/admin/api/queues/'));
    }

})();
