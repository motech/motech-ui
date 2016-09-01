describe('Period amount Directive', function() {
    var compile, scope, element;
    var ngModelName = 'periodString';

    beforeEach(module('motech-scheduler'));

    beforeEach(inject(function($compile, $rootScope, $httpBackend){
        $httpBackend.when('GET', '/server/status/status.html').respond({});
        $httpBackend.when('GET', 'http://localhost:8080/motech-platform-server/server/bootstrap/status').respond({});
        $httpBackend.when('GET', 'scheduler/period-modal.html').respond({});

        compile = $compile;
        scope = $rootScope.$new();

        element = angular.element('<period-modal ng-model="' + ngModelName + '" period-amount></period-modal>');
        scope.sliderMax = {
            year: 10,
            month: 24,
            week: 55,
            day: 365,
            hour: 125,
            minute: 360,
            second: 360
        };
        compile(element)(scope);
        scope.$digest();
    }));

    it('should load period amount', function() {
        expect(element.attr('period-amount')).toBeDefined();
    });

    it('should pass ng-model', function() {
        expect(element.attr('ng-model')).toEqual(ngModelName);
    });

    it('should set slider max values', function() {
        var maxValues = {
            year: 10,
            month: 24,
            week: 55,
            day: 365,
            hour: 125,
            minute: 360,
            second: 360
        };
        expect(element.scope().sliderMax).toEqual(maxValues);
    });

});
