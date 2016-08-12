describe('Log options controller', function() {
    var modalFactory, loadingModal, logOptionsFactory, controller, scope;

    beforeEach(module('motech-admin'));

    beforeEach(inject(function($rootScope, $controller, ModalFactory, LoadingModal, LogOptionsFactory) {
        scope = $rootScope.$new();
        modalFactory = ModalFactory;
        logOptionsFactory = LogOptionsFactory;
        loadingModal = LoadingModal;

        controller = $controller('LogOptionsController', {
        $scope: scope,
        ModalFactory: modalFactory,
        LoadingModal: loadingModal,
        LogOptionsFactory: logOptionsFactory});
    }));

    it('should work, like for real...', function(){
        var question = true;

        expect(question).toEqual(true);
        expect(controller).toBeDefined();
        expect(controller).not.toBe(null);
    });
});