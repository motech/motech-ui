describe('Log file controller', function(){
    var scope, serverService, logFileFactory, controller, ok;

     beforeEach(function () {
            module('motech-admin');
        });

    beforeEach(function(){
        ok = 'nic';
        console.log("not injected");
    });

  beforeEach(inject(function($rootScope){
    console.log("injected");
    scope = $rootScope.$new();
  }));

    it('should work', function(){
        expect(scope).toBeDefined();
        expect(ok).toBeDefined();

    });
});