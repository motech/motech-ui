describe('Mt invalid Directive', function () {
    var compile,
        scope,
        element,
        argument = 'periodString';

    beforeEach(module('motech-scheduler'));

    beforeEach(inject(function ($compile, $rootScope, $httpBackend) {
        $httpBackend.when('GET', '/server/status/status.html').respond({});
        $httpBackend.when('GET', 'http://localhost:8080/motech-platform-server/server/bootstrap/status').respond({});

        compile = $compile;
        scope = $rootScope.$new();
        element = angular.element('<div mt-invalid="mtInvalid"></div>');
        scope.mtInvalid = argument;
        element = compile(element)(scope);
    }));

    it('should pass mt-invalid', function () {
        expect(element.attr('mt-invalid')).toEqual('mtInvalid');
    });

    it('should set mtInvalid values', function () {
        expect(element.scope().mtInvalid).toEqual(argument);
    });

    it('should add class text-danger to element', function () {
        scope.$parent.periodString = true;
        scope.$digest();
        expect(element.hasClass('text-danger')).toBe(true);
    });

    it('should remove class text-danger from element', function () {
        scope.$parent.periodString = true;
        scope.$digest();
        expect(element.hasClass('text-danger')).toBe(true);

        scope.$parent.periodString = false;
        scope.$digest();
        expect(element.hasClass('text-danger')).toBe(false);
    });

});
