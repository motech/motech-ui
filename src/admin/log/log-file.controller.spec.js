describe('Log file controller', function(){
    var scope, serverService, logFileFactory, controller;

    beforeEach(module('motech-admin'));


    beforeEach(inject(function($rootScope, $controller, ServerService, LogFileFactory){
        scope = $rootScope.$new();
        serverService = ServerService;
        logFileFactory = LogFileFactory;
        controller =  $controller('LogFileController', {
                $scope: scope,
                ServerService: serverService,
                LogFileFactory: logFileFactory
            });
    }));

    if('should work', function(){
        expect(scope).toBeDefined();
        expect(serverService).toBeDefined();
        expect(logFileFactory).toBeDefined();
        expect(controller).toBeDefined();

    });
});