(function(){
    'use strict';

    angular.module('motech-admin')
        .controller('MessagesSettingsController', messagesSettingsController);

    messagesSettingsController.$inject = ['$scope', 'MessagesSettingsFactory', '$location', 'ModalFactory', 'NotificationRuleDtoService',
                                            'NotificationRuleService', 'BundlesFactory'];
    function messagesSettingsController ($scope, MessagesSettingsFactory, $location, ModalFactory, NotificationRuleDtoService,
                                            NotificationRuleService, BundlesFactory) {

        $scope.bundles = BundlesFactory.query();
        $scope.messagesSettings = MessagesSettingsFactory.query();
        $scope.notificationRuleDto = new NotificationRuleDtoService();
        $scope.notificationRuleDto.notificationRules = NotificationRuleService.query();
        $scope.notificationRuleDto.idsToRemove = [];

        $scope.changeRuleActionType = function (notificationRule, actionType) {
            notificationRule.actionType = actionType;
        };

        $scope.changeRuleLevel = function (notificationRule, level) {
            notificationRule.level = level;
        };

        $scope.changeRuleModuleName = function (notificationRule, moduleName) {
            notificationRule.moduleName = moduleName;
        };

        $scope.saveRules = function (notificationRule) {
            notificationRule.$save();
        };

        $scope.removeRule = function (notificationRule) {
            var nRules = $scope.notificationRuleDto.notificationRules;
            var i = nRules.indexOf(notificationRule);
            if (i !== -1) {
                nRules.splice(i, 1);
            }
            if (notificationRule.id) {
                $scope.notificationRuleDto.idsToRemove.push(notificationRule.id);
            }
        };

        $scope.newRule = function () {
            var notificationRule = new NotificationRuleService();
            notificationRule.actionType = 'EMAIL';
            notificationRule.level = 'CRITICAL';
            notificationRule.moduleName = '';

            $scope.notificationRuleDto.notificationRules.push(notificationRule);
        };

        $scope.save = function () {
            $scope.notificationRuleDto.$save(function () {
                ModalFactory.showSuccessAlert('admin.messages.notifications.saved');
                $location.path('/messages/settings');
            }, function () {
                ModalFactory.showErrorAlert('admin.messages.notifications.errorSave');
            });
        };
    }

})();
