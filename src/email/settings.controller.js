(function(){
	'use strict';

	angular.module('motech-email')
	 	.controller('EmailSettingsController', emailSettingsCtrl);

	emailSettingsCtrl.$inject = ['$q', 'i18nService','$scope', 'motechAlert', 'emailSettings'];
	function emailSettingsCtrl ($q, i18nService, $scope, motechAlert, emailSettings) {
        $scope.settings = emailSettings;

        $scope.timeMultipliers = {
            'hours': i18nService.getMessage('email.settings.log.units.hours'),
            'days': i18nService.getMessage('email.settings.log.units.days'),
            'weeks': i18nService.getMessage('email.settings.log.units.weeks'),
            'months': i18nService.getMessage('email.settings.log.units.months'),
            'years': i18nService.getMessage('email.settings.log.units.years')
        };

        $scope.submit = function () {
            $scope.settings.$save()
            .then( function () {
                motechAlert(
                    i18nService.getMessage('email.header.success'),
                    i18nService.getMessage('email.settings.saved')
                );
            })
            .catch( function (response) {
                console.log("Error with stack trace....");
            });
        };

        $scope.purgeTimeControlsDisabled = function () {
            if ($scope.settings.logPurgeEnable === "true") {
                return false;
            } else {
                return true;
            }
        };
    }
})();