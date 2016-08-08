describe('Email Settings Controller', function() {
    var scope, controller, emailSettings;

    beforeEach(module('motech-email'));
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        emailSettings2 = emailSettings;
        controller = $controller('EmailSettingsController', {
            $scope: scope,
            emailSettings: emailSettings
        });
        scope.settings = {logPurgeEnable: "true"};
    }));

    it('should set scope.timeMultipliers', function() {
        expect(scope.timeMultipliers.hours).toEqual("email.settings.log.units.hours");
        expect(scope.timeMultipliers.days).toEqual("email.settings.log.units.days");
        expect(scope.timeMultipliers.weeks).toEqual("email.settings.log.units.weeks");
        expect(scope.timeMultipliers.months).toEqual("email.settings.log.units.months");
        expect(scope.timeMultipliers.years).toEqual("email.settings.log.units.years");
    });

    it('should check if log purge is enabled', function() {
        expect(scope.purgeTimeControlsDisabled()).toEqual(false);
        scope.settings.logPurgeEnable = "false";
        expect(scope.purgeTimeControlsDisabled()).toEqual(true);
    });
});