describe('Period Amount directive', function() {
    var compile, scope, element;

    beforeEach(module('motech-common'));

    beforeEach(inject(function($compile, $rootScope){
        compile = $compile;
        scope = $rootScope.$new();

        element = angular.element('<input type="text" ng-model="repeatString" period-amount></input>');
        compile(element)(scope);
        scope.$digest();
    }));

    it('Should fail if ngModel is not specified', function() {
        expect(function() {
            compile(angular.element('<input type="text" period-amount></input>'))(scope);
            scope.$digest();
        }).toThrow();
    });

    it('Should parse period', function() {
        var button = element.parent().find('.period-modal-opener');

        button.triggerHandler('click');
        scope.$digest();
    });

    it('Should set slider max values', function() {

    });

    //it('Should return period string', function() {
    //    scope.periodString = "P1Y2M3W4DT5H6M7S"; // 1 year, 2 months, 3 weeks, 4 days, 5 hours, 6 minutes, 7 seconds
    //    var returned = scope.compileValueInputs(1, 2, 3, 4, 5, 6, 7);
    //    expect(returned).toEqual(scope.periodString);
    //});
});