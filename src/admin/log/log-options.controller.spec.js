describe('Log options controller', function() {
    var modalFactory, loadingModal, logOptionsFactory, controller, scope;

    beforeEach(module('motech-admin'));

    beforeEach(inject(function($rootScope, $controller, ModalFactory, LogOptionsFactory) {
        scope = $rootScope.$new();
        modalFactory = ModalFactory;
        logOptionsFactory = LogOptionsFactory;

        controller = $controller('InputMapController', {$scope: scope});
    }));

    it('should work, like for real...', function(){
        var question = true;

        expect(question).toEqual(true);
        expect(controller).toBeDefined();
        expect(controller).not.toBe(null);
    });
});