describe('Log options controller', function() {
    var modalFactory, loadingModal, logOptionsFactory, controller, scope;

    beforeEach(module('motech-admin'));

    beforeEach(inject(function($rootScope, _$controller_, ModalFactory, LogOptionsFactory) {
        scope = $rootScope.$new();
        modalFactory = ModalFactory;
        logOptionsFactory = LogOptionsFactory;

        $controller = _$controller_;

        controller = $controller('LogOptionsController', {$scope: scope});
    }));

    it('should work, like for real...', function(){
        var question = true;

        expect(question).toEqual(true);
        expect(controller).toBeDefined();
        expect(controller).not.toBe(null);
    });
});