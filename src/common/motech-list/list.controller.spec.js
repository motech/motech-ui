describe('List Controller', function () {
  var scope, controller;
  beforeEach(module('motech-common'));
  beforeEach(inject(function($rootScope, $controller){
    scope = $rootScope.$new();
    controller = $controller('MotechListController', {$scope: scope});
  }));
  it('can add new columns', function(){
    controller.addColumn('foo','bar',true);
    expect(controller.columns[0].id).toEqual('foo');
    expect(controller.columns[0].name).toEqual('bar');
    expect(controller.columns[0].sortable).toEqual(true);
  });
  it('can add multiple columns', function(){
    controller.addColumn('foo','bar',false);
    controller.addColumn('baz','quux',true);
    expect(controller.columns.length).toEqual(2);
  });
  it('cannot add multiple columns with the same id', function(){
      controller.addColumn('foo','bar',false);
      controller.addColumn('foo','quux',true);
      expect(controller.columns.length).toEqual(1);
      expect(controller.columns[0].name).toEqual('bar');
  });

});