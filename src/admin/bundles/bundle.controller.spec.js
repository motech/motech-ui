describe('Bundle Controller', function() {
    var scope, controller, bundle;

    beforeEach(module('motech-admin'));

    beforeEach(inject(function($rootScope, $controller){
        scope = $rootScope.$new();
        controller = $controller('BundleController', {$scope: scope, bundle: bundle});

    }));

    it("If module equal bundle", function() {
        expect(scope.module).toEqual(bundle);
    });
});