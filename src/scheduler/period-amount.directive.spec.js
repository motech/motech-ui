describe('Period Amount directive', function() {
    var compile, scope, element;
    var ngModelName = 'periodString';

    beforeEach(module('motech-common'));

    beforeEach(inject(function($compile, $rootScope){
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

    it('Should load period amount', function() {
        expect(element.attr('period-amount')).toBeDefined();
    });

    it('Should pass ng-model', function() {
        expect(element.attr('ng-model')).toEqual(ngModelName);
    });

    it('Should set slider max values', function() {
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