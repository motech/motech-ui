describe('Input Map Controller', function() {
  var scope, controller;

  beforeEach(module('motech-common'));

  beforeEach(inject(function($rootScope, $controller){
    scope = $rootScope.$new();
    controller = $controller('InputMapController', {$scope: scope});
  }));

  it('Can add new properties', function() {
    controller.add('foo', 'bar');
    expect(controller.properties.foo).toEqual('bar');
  });

  it('Cannot overwrite existing properties', function(){
    controller.add('foo', 'bar');
    controller.add('foo', 'motech');
    expect(controller.properties.foo).toEqual('bar');
  });

  it('Can remove properties', function(){
    controller.add('foo', 'bar');
    controller.remove('foo');
    expect(controller.properties.foo).toEqual(undefined);
  });

});