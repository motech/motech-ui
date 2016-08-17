describe('Log file controller', function(){
    var scope, serverService, logFileFactory, controller, ok;

     beforeEach(function () {
            module('motech-admin');
        });

    beforeEach(function(){
        ok = 'nic';
        console.log("not injected");
    });

    beforeEach( inject(function($rootScope, _ServerService_, _LogFileFactory_){
        scope = $rootScope.$new();
        console.log("injected");
        serverService = _ServerService_;
        logFileFactory = _LogFileFactory_;
    }));

    it('should work', function(){
        expect(scope).toBeDefined();
        expect(serverService).toBeDefined();
        expect(logFileFactory).toBeDefined();
        expect(ok).toBeDefined();

    });
});