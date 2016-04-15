describe('unit testing Server Node Name', function() {
  var $compile,
      $rootScope,
      $httpBackend;

  beforeEach(module('motech-widgets'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function($injector){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = $injector.get('$compile');
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
  }));

  it('Replaces telement with server nodename', function() {
    $httpBackend.when('POST','getNodeName').respond("MotechNode");
    
    var element = $compile("<server-node-name></server-node-name>")($rootScope);
    $rootScope.$digest();

    expect(element.html()).toContain("MotechNode");
  });
});