describe('Email export directive', function() {
    var element, compile, scope;

    beforeEach(module('motech-common'));
    beforeEach(inject(function($compile, $rootScope){
        compile = $compile;
        scope = $rootScope.$new();
        scope.range = 5;
        scope.month = 10;
        element = angular.element('<email-export close="hideExportModal()"></email-export>');
        compile(element)(scope);
        scope.$digest();
    }));

    it('should pass close', function () {
        expect(element.attr('close')).toBeDefined();
        expect(element.attr('close')).toEqual('hideExportModal()');
    });

    it('should have tagName element with good value', function () {
        expect(element.prop("tagName")).toEqual("EMAIL-EXPORT");
    });

    it('should set range and month element', function () {
        expect(element.scope().range).toEqual(5);
        expect(element.scope().month).toEqual(10);
    });
});