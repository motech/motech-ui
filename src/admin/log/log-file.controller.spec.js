describe('Log file controller', function(){
    var scope, serverService, logFileFactory, controller, ok;

    beforeEach(module('motech-common'));

      beforeEach(inject(function($rootScope, $controller){
        scope = $rootScope.$new();
        controller = $controller('InputMapController', {$scope: scope});
      }));


    it('should work', function(){
        expect(scope).toBeDefined();
    });
});