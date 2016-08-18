describe('Reset password Directive', function() {
    var element;
    var scope;

    beforeEach(module('motech-auth'));

    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope.$new();
        element = angular.element('<reset-password></reset-password>');
        scope.send = function() {};
        scope.back = function() {};
        $compile(element)(scope);
    }));

    it('should have tagName with value "RESET-PASSWORD"', function() {
        expect(element.prop("tagName")).toEqual("RESET-PASSWORD");
    });

    it('should execute send method', function() {
        spyOn(element.scope(), 'send');
        element.scope().send();
        expect(element.scope().send).toHaveBeenCalled();
    });

    it('should execute back method', function() {
        spyOn(element.scope(), 'back');
        element.scope().back();
        expect(element.scope().back).toHaveBeenCalled();
    });

});
