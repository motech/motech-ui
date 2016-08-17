describe('Log file controller', function(){
    var scope, serverService, logFileFactory, controller, ok;

     beforeEach(function () {
            module('motech-admin');
        });

    beforeEach(function(){
        ok = 'nic';
        console.log("not injected");
    });

  beforeEach(inject(function($rootScope, $controller){
    console.log("injected");
    scope = $rootScope.$new();
    controller = $controller('LogFileController', {$scope: scope});
  }));

    it('should work', function(){
        expect(scope).toBeDefined();
        expect(controller).toBeDefined();
        expect(ok).toBeDefined();

    });
});