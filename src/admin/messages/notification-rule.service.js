(function () {
    'use strict';

    angular.module('motech-admin')
        .factory('NotificationRuleService', NotificationRuleService);

    NotificationRuleService.$inject = ['$resource', 'ServerService'];
    function NotificationRuleService ($resource, ServerService) {
        var sendURL = ServerService.formatURL('module/admin/api/messages/rules/:ruleId');
        return $resource(sendURL, {ruleId: '@_id'});
    }

})();