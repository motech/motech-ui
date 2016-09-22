describe('Period validity Directive', function() {
    var element,
        scope,
        form;

    beforeEach(module('motech-scheduler'));

    beforeEach(inject(function ($compile, $rootScope, $httpBackend) {
        $httpBackend.when('GET', '/server/status/status.html').respond({});
        $httpBackend.when('GET', 'http://localhost:8080/motech-platform-server/server/bootstrap/status').respond({});

        scope = $rootScope.$new();
        element = angular.element(
            '<form name="form">' +
            '<input type="text" ng-model="model.period" name="period" period-validity />' +
            '</form>'
        );
        scope.model = { period: null };
        $compile(element)(scope);
        scope.$digest();
        form = scope.form;
    }));

    it('should pass string with good period', function () {
        form.period.$setViewValue('PT2H3M5S');
        scope.$digest();
        expect(scope.model.period).toEqual('PT2H3M5S');
        expect(form.period.$valid).toBe(true);
    });

    it('should pass string with good period', function () {
        form.period.$setViewValue('PT2H3M');
        scope.$digest();
        expect(scope.model.period).toEqual('PT2H3M');
        expect(form.period.$valid).toBe(true);
    });

    it('should pass string with good period', function () {
        form.period.$setViewValue('PT2H5S');
        scope.$digest();
        expect(scope.model.period).toEqual('PT2H5S');
        expect(form.period.$valid).toBe(true);
    });

    it('should pass string with good period', function () {
        form.period.$setViewValue('PT2H');
        scope.$digest();
        expect(scope.model.period).toEqual('PT2H');
        expect(form.period.$valid).toBe(true);
    });

    it('should pass string with good period', function () {
        form.period.$setViewValue('PT3M5S');
        scope.$digest();
        expect(scope.model.period).toEqual('PT3M5S');
        expect(form.period.$valid).toBe(true);
    });

    it('should pass string with good period', function () {
        form.period.$setViewValue('PT3M');
        scope.$digest();
        expect(scope.model.period).toEqual('PT3M');
        expect(form.period.$valid).toBe(true);
    });

    it('should pass string with good period', function () {
        form.period.$setViewValue('PT5S');
        scope.$digest();
        expect(scope.model.period).toEqual('PT5S');
        expect(form.period.$valid).toBe(true);
    });

    it('should pass string with good period', function () {
        form.period.$setViewValue('P2010Y1M1W1DT5S');
        scope.$digest();
        expect(scope.model.period).toEqual('P2010Y1M1W1DT5S');
        expect(form.period.$valid).toBe(true);
    });

    it('should pass string with good period', function () {
        form.period.$setViewValue('P2010Y1M1W1D');
        scope.$digest();
        expect(scope.model.period).toEqual('P2010Y1M1W1D');
        expect(form.period.$valid).toBe(true);
    });

    it('should not pass string with bad period', function () {
        form.period.$setViewValue('1H');
        scope.$digest();
        expect(scope.model.period).toBeUndefined();
        expect(form.period.$valid).toBe(false);
    });

    it('should not pass string with bad period', function () {
        form.period.$setViewValue('PT');
        scope.$digest();
        expect(scope.model.period).toBeUndefined();
        expect(form.period.$valid).toBe(false);
    });

});
