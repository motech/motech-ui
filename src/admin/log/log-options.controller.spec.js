describe('Log options controller', function() {
    var modalFactory, loadingModal, logOptionsFactory, controller, scope;

    beforeEach(module('motech-admin'));

    beforeEach(inject(function($controller, $rootScope,  ModalFactory, LoadingModal, LogOptionsFactory) {
        scope = $rootScope.$new();
        modalFactory = ModalFactory;
        loadingModal = LoadingModal;
        logOptionsFactory = LogOptionsFactory;

        controller = $controller('LogOptionsController', {
            $scope: scope,
            ModalFactory: modalFactory,
            LoadingModal: loadingModal,
            LogOptionsFactory: logOptionsFactory
        });
    }));

    it('should work, like for real...', function(){
        var question = true;

        expect(question).toEqual(true);
        expect(controller).toBeDefined();
        expect(controller).not.toBe(null);
    });
});