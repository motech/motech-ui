(function(){
    'use strict';

    angular.module('motech-admin')
        .factory('NotificationRuleDtoService', NotificationRuleDtoService);

    NotificationRuleDtoService.$inject = ['$resource', 'ServerService'];
    function NotificationRuleDtoService ($resource, ServerService) {
        var sendURL = ServerService.formatURL('module/admin/api/messages/rules/dto');
        return $resource(sendURL);
    }

})();