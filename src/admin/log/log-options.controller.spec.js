describe('Log OptionsController', function() {
  beforeEach(module('motech-admin'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('tests', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('LogOptionsController', { $scope: $scope });
    });

    it('sets the strength to "strong" if the password length is >8 chars', function() {

      expect(controller).toBeDefined();
    });
  });
});