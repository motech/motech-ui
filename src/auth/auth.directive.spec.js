describe("Auth Directive", function () {

    var $scope;
    var AuthCtrl;
    var AuthServiceMock;
    var element;

    beforeEach(module('motech-auth'));

    beforeEach(inject(function($rootScope, $compile) {
        $scope = $rootScope.$new();
        element = angular.element("<div motech-auth></div>");
        $compile(element)($scope);
        //$scope.$digest();
    }));

    it('should pass motech-auth', function() {
        expect(element.attr('motech-auth')).toBeDefined();
    });

});
