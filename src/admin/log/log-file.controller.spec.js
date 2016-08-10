describe('Log file controller', function(){
    var scope, serverService, logFileFactory, controller;

    beforeEach(module('motech-admin'));


    beforeEach(inject(function($rootScope, $controller, ServerService, LogFileFactory){
        scope = $rootScope.$new();
        serverService = ServerService;
        logFileFactory = LogFileFactory;
        this.controller =  $controller('LogFileController', {
                $scope: scope,
                ServerService: serverService,
                LogFileFactory: logFileFactory
            });
    }));

    it('should refresh log', function(){
        spyOn(logFileFactory, 'getLog').and.callFake(function(){
            return {
                then: function(success){
                    success('new value');
                    return this;
                }
            };
        });

        this.controller.refresh();

        expect(logFileFactory.getLog).toHaveBeenCalled();
        expect(scope.log).toEqual('new value');
    });

    it('should get file log path', function(){
        spyOn(serverService, 'formatURL').and.returnValue('proper URL');

        var returnValue = this.controller.getFileLogPath();

        expect(serverService.formatURL).toHaveBeenCalled();
        expect(returnValue).toEqual('proper URL');
    });
});