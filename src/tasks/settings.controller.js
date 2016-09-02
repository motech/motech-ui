(function(){
    'use strict';

    angular.module('motech-tasks')
    .controller('TasksSettingsController', tasksSettingsCtrl);

    tasksSettingsCtrl.$inject = ['i18nService','$scope', 'ModalFactory', 'tasksSettings'];
    function tasksSettingsCtrl (i18nService, $scope, ModalFactory, tasksSettings) {
        $scope.settings = tasksSettings;

        $scope.submit = function () {
            $scope.settings.$save().then(function () {
                ModalFactory.showSuccessAlert(
                    i18nService.getMessage('task.settings.success.saved'),
                    i18nService.getMessage('server.saved')
                );
            })
            .catch(function (response) {
                ModalFactory.showErrorAlert(
                    i18nService.getMessage('task.settings.error.saved'),
                    i18nService.getMessage('server.error')
                );
            });
        };

        $scope.isNumeric = function(prop) {
            return $scope.settings.hasOwnProperty(prop) && /^[0-9]+$/.test($scope.settings[prop]);
        };
    }

})();
