describe('Log-file controller ', function() {
    var scope, serverService, logFileFactory, controller;

    beforeEach(module('motech-admin'));


    beforeEach(inject(function($rootScope, $controller, _ServerService_, _LogFileFactory_) {
        scope = $rootScope.$new();
        serverService = _ServerService_;
        logFileFactory = _LogFileFactory_;
        controller =  $controller('LogFileController', {
                $scope: scope,
                ServerService: serverService,
                LogFileFactory: logFileFactory
            });
    }));

    it("should injects service 'ServerService'", function () {
        expect(serverService).toBeDefined();
    });

    it("should injects service 'LogFileFactory'", function () {
        expect(logFileFactory).toBeDefined();
    });

    it('should refresh log', function() {
        spyOn(logFileFactory, 'getLog').and.callFake(function() {
            return {
                then: function(success){
                    success('motech-log-text');
                    return this;
                }
            };
        });
        expect(scope.log).not.toBeDefined();

        controller.refresh();

        expect(scope.log).toBeDefined();
        expect(logFileFactory.getLog).toHaveBeenCalled();
        expect(scope.log).toEqual('motech-log-text');
    });

    it('should get file log path', function() {
        spyOn(serverService, 'formatURL').and.returnValue('proper MOTECH LOG FILE URL');

        controller.getFileLogPath();

        expect(serverService.formatURL).toHaveBeenCalled();
        expect(controller.getFileLogPath()).toEqual('proper MOTECH LOG FILE URL');
    });
});