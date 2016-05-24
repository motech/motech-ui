describe('Input Map directive', function() {
  var element, scope;

  beforeEach(module('motech-common'));
  beforeEach(module('motech-templates'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function($compile, $rootScope){
    scope = $rootScope.$new();
    scope.properties = {
      'foo': 'bar'
    };
    element = angular.element('<input-map ng-model="properties"></input-map>');
    $compile(element)(scope);
    scope.$digest();
  }));

  it('Replaces input-map with fieldset', function() {
    expect(element.prop("tagName")).toEqual("FIELDSET");
  });
});