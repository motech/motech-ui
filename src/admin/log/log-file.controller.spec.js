describe('Log file controller', function(){
    var scope, serverService, logFileFactory, controller, ok;

     beforeEach(function () {
            module('motech-admin');
        });

    beforeEach(function(){
        ok = 'nic';
        console.log("not injected");
    });

    beforeEach( inject(function($rootScope){
        scope = $rootScope.$new();
        console.log("injected");

    }));

    it('should work', function(){
        expect(scope).toBeDefined();
        expect(ok).toBeDefined();

    });
});