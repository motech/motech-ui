describe('AdminBundlesListController', function() {

    var scope, controller, state;

    beforeEach(module('motech-admin'));
    beforeEach(inject(function($rootScope, $controller, $state) {
        scope = $rootScope.$new();
        controller = $controller('BundlesListController', {$scope: scope, $state: state});
    }));

    it("Should execute goToSettingsURL", function() {
        spyOn(scope, "goToSettingsURL");
        var bundle = {
            settingsURL: "/temp",
            isActive: function(){return true;},
            angularModule: "motech-admin"
        };
        scope.loadBundleSettingsPage(bundle);
        expect(scope.goToSettingsURL).toHaveBeenCalledWith(bundle.angularModule, bundle.settingsURL);
    });

    it("ShowSettings function should return true", function() {
        var bundle = {
            symbolicName: "tempName",
            settingsURL: "/temp",
            isActive: function(){return true;},
            angularModule: "motech-admin",
        };
        var bundle2 = {};
        scope.bundlesWithSettings = [bundle2, bundle];
        scope.showSettings(bundle);
        expect(scope.showSettings(bundle)).toEqual(true);
    });

});