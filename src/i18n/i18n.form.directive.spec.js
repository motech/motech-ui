describe('i18n form', function() {
    var element, scope, compile;

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
    beforeEach(inject(function($compile, $rootScope) {
        compile = $compile;
        scope = $rootScope.$new();
        scope.language = 'es';
        element = angular.element('<motech-i18n-form></motech-i18n-form>');
        compile(element)(scope);
        scope.$digest();
    }));

    it('should have tagName with value "MOTECH-I18N-FORM"', function() {
        expect(element.prop("tagName")).toEqual("MOTECH-I18N-FORM");
    });

    it('should change language', function() {
        expect(element.scope().language).toEqual('es');
    });
});