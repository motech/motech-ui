(function(){
    'use strict';

    angular.module('motech-admin')
        .factory('MessagesSettingsFactory', messagesSettingsFactory);

    messagesSettingsFactory.$inject = ['$resource', 'ServerService'];
    function messagesSettingsFactory ($resource, ServerService) {
        return $resource(ServerService.formatURL('module/admin/api/messages/rules'));
    }

})();