(function () {
    'use strict';

    angular.module('motech-admin')
        .factory('QueuesFactory', queuesFactory);

    queuesFactory.$inject = ['$rootScope', '$resource', 'ServerService'];
    function queuesFactory ($rootScope, $resource, ServerService) {
        var Queue = $resource(
            ServerService.formatURL('/module/admin/api/queues/:queueName/:action'),
            {queueName:'@queueName'},
            {
                details: {method: 'GET', params: {action: 'detail'}}
            }
        );
        return Queue;
    }

})();
