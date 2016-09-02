describe('Log file controller', function(){
    var scope, serverService, logFileFactory, controller, ok;

     beforeEach(function () {
            module('motech-admin');
        });

    beforeEach(function(){
        ok = 'nic';z
    });

    beforeEach( inject(function($rootScope, $controller, _ServerService_, _LogFileFactory_){
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