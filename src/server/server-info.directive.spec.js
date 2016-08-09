describe('Email export directive', function() {
    var element, compile, scope;

    beforeEach(module('motech-common'));
    beforeEach(inject(function($compile, $rootScope) {
        compile = $compile;
        scope = $rootScope.$new();
        element = angular.element('<div motech-server-info></div>');
        compile(element)(scope);
        scope.$digest();
    }));

    it('should have tagName with value "DIV"', function() {
        expect(element.prop("tagName")).toEqual("DIV");
    });

    it('should pass attribute "motech-server-info"', function() {
        expect(element.attr('motech-server-info')).toBeDefined();
    });
});