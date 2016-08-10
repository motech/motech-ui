(function(){
    'use strict';

    angular.module('motech-admin')
        .factory('MessagesFactory', messagesFactory);

    messagesFactory.$inject = ['$resource', 'ServerService'];
    function messagesFactory ($resource, ServerService) {
        return $resource(ServerService.formatURL('module/admin/api/messages'));
    }

})();