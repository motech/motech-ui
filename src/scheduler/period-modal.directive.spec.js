describe('Period Amount directive', function() {
    var compile, scope, element;

    beforeEach(module('motech-common'));

    beforeEach(inject(function($compile, $rootScope){
        compile = $compile;
        scope = $rootScope.$new();

        element = angular.element('<period-modal></period-modal>');
        compile(element)(scope);
        scope.$digest();
    }));
});
