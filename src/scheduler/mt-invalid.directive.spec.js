describe('Period Amount directive', function() {
    var compile, scope, element;

    beforeEach(module('motech-common'));

    beforeEach(inject(function($compile, $rootScope){
        compile = $compile;
        scope = $rootScope.$new();
        element = angular.element('<div mt-invalid></div>');
        compile(element)(scope);
        scope.$digest();
    }));

    it('Should add class "text-danger" if value is true', function() {
    });

});
