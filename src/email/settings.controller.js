(function(){
	'use strict';

	angular.module('motech-email')
	 	.controller('EmailSettingsController', emailSettingsCtrl);

	emailSettingsCtrl.$inject = ['$scope', 'EmailSettingsFactory'];
	function emailSettingsCtrl ($scope, EmailSettingsFactory) {
        $scope.settings = SettingsService.get();

        $scope.add = function (property) {
            if ($scope.settings.additionalProperties[property.name] === undefined) {
                $scope.settings.additionalProperties[property.name] = property.value;
                $scope.property = {};
            } else {
                motechAlert('email.header.error', 'email.settings.alreadyExist');
            }
        };

        $scope.remove = function (name) {
            delete $scope.settings.additionalProperties[name];
        };

        $scope.emptyFields = function (property) {
            if (property === undefined) {
                return true;
            } else if (property.name === undefined || property.name === null || property.value === undefined || property.value === null) {
                return true;
            }
            return false;
        };

        $scope.timeMultipliers = {
            'hours': $scope.msg('email.settings.log.units.hours'),
            'days': $scope.msg('email.settings.log.units.days'),
            'weeks': $scope.msg('email.settings.log.units.weeks'),
            'months': $scope.msg('email.settings.log.units.months'),
            'years': $scope.msg('email.settings.log.units.years')
        };

        $scope.submit = function () {
            SettingsService.save(
                {},
                $scope.settings,
                function () {
                    motechAlert('email.header.success', 'email.settings.saved');
                    $scope.settings = SettingsService.get();
                },
                function (response) {
                    handleWithStackTrace('email.header.error', 'server.error', response);
                }
            );
        };

        $scope.isNumeric = function (prop) {
            return $scope.settings.hasOwnProperty(prop) && /^[0-9]+$/.test($scope.settings[prop]);
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