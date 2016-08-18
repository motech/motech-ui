describe('Login Directive', function() {
    var scope;
    var compile;
    var element;

    beforeEach(module('motech-auth'));

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        compile = $compile;
        element = angular.element("<motech-login></motech-login>");
        scope.doLogin = function() {};
        scope.forgot = function() {};
        compile(element)(scope);
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
