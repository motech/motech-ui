describe('Login Directive', function() {
    var $scope, $compile, element;

    beforeEach(module('motech-auth'));
    beforeEach(inject(function($rootScope, _$compile_) {
        $scope = $rootScope.$new();
        $compile = _$compile_;
        element = angular.element("<motech-login></motech-login>");
        $scope.doLogin = function() {};
        $scope.forgot = function() {};
        $compile(element)($scope);
        //$scope.$digest();
    }));

    it('should have tagName with value "MOTECH-LOGIN"', function() {
        expect(element.prop("tagName")).toEqual("MOTECH-LOGIN");
    });

    it('should execute doLogin method', function() {
        spyOn(element.scope(), 'doLogin');
        element.scope().doLogin();
        expect(element.scope().doLogin).toHaveBeenCalled();
    });

    it('should execute forgot method', function() {
        spyOn(element.scope(), 'forgot');
        element.scope().forgot();
        expect(element.scope().forgot).toHaveBeenCalled();
    });

});
