describe('Log file controller', function(){
    var scope, serverService, logFileFactory, controller;

    beforeEach(module('motech-admin'));


    beforeEach(inject(function($scope, $controller, ServerService, LogFileFactory){
       // scope = $rootScope.$new();
        scope = $scope;
        serverService = ServerService;
        logFileFactory = LogFileFactory;
        controller =  $controller('LogFileController', {
                $scope: scope,
                ServerService: serverService,
                LogFileFactory: logFileFactory
            });
    }));

    it('should work', function(){
        expect(scope).toBeDefined();
        expect(serverService).toBeDefined();
        expect(logFileFactory).toBeDefined();
        expect(controller).toBeDefined();

    });
});