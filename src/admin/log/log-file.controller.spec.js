describe('Log file controller', function(){
    var scope, serverService, logFileFactory, controller, ok;

    beforeEach(module('motech-admin'));


    beforeEach(inject(function($rootScope, $controller, _ServerService_, _LogFileFactory_){
        ok='k';
        scope = $rootScope.$new();
        serverService = _ServerService_;
        logFileFactory = _LogFileFactory_;
        controller =  $controller('LogFileController', {
                $scope: scope,
                ServerService: serverService,
                LogFileFactory: logFileFactory
            });
    }));

    it('should work', function(){
        expect(serverService).toBeDefined();
        expect(logFileFactory).toBeDefined();
        expect(controller).toBeDefined();
        expect(ok).toBeDefined();

    });
});