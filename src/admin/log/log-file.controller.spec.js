describe('Log file controller', function(){
    var scope, serverService, logFileFactory, controller, ok;

    beforeEach(module('motech-admin'));


    beforeEach(inject(function( $controller, ServerService, LogFileFactory){
        ok='k';
        serverService = ServerService;
        logFileFactory = LogFileFactory;
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