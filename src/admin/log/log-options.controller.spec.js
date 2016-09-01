describe('LogOptions  controller', function() {
    var modalFactory, loadingModal, logOptionsFactory, controller, scope, rootScope;


    beforeEach(module('motech-admin'));

    beforeEach(inject(function($rootScope, $controller, _ModalFactory_, _LoadingModal_, _LogOptionsFactory_) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        modalFactory = _ModalFactory_;
        logOptionsFactory = _LogOptionsFactory_;
        loadingModal = _LoadingModal_;

        controller = $controller('LogOptionsController', {
            $scope: scope,
            ModalFactory: modalFactory,
            LogOptionsFactory: logOptionsFactory,
            LoadingModal: loadingModal
        });
    }));

    it("should injects service 'ModalFactory'", function () {
        expect(modalFactory).toBeDefined();
    });

    it("should injects service 'logOptionsFactory'", function () {
        expect(logOptionsFactory).toBeDefined();
    });

    it("should injects service 'logOptionsFactory'", function () {
        expect(loadingModal).toBeDefined();
    });

    it("should set logs", function() {
        scope.logs = true;
        expect(scope.logs).toEqual(true);
        expect(controller).toBeDefined();
        expect(controller).not.toBe(null);
        controller.logs = [{name: 'log', level: 'off'}];
        expect(controller.logs[0]).toEqual(Object({name: 'log', level: 'off'}));
    });
});