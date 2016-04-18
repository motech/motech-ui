(function(){
	'use strict';

	angular.module('motech-email')
	 	.controller('EmailSettingsController', emailSettingsCtrl);

	emailSettingsCtrl.$inject = ['$q', '$translate','$scope', 'motechAlert', 'EmailSettingsFactory'];
	function emailSettingsCtrl ($q, $translate, $scope, motechAlert, EmailSettingsFactory) {
        $scope.settings = EmailSettingsFactory.get();

        $q.all({
            'hours': $translate('email.settings.log.units.hours'),
            'days': $translate('email.settings.log.units.days'),
            'weeks': $translate('email.settings.log.units.weeks'),
            'months': $translate('email.settings.log.units.months'),
            'years': $translate('email.settings.log.units.years')
        }).then(function(dict){
            $scope.timeMultipliers = dict;            
        });

        $scope.submit = function () {
            $scope.settings.$save()
            .then( function () {
                motechAlert('email.header.success', 'email.settings.saved');
            })
            .catch( function (response) {
                console.log("Error with stack trace....");
            });
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