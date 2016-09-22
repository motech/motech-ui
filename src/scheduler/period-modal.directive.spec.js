describe('Period modal Directive', function () {
    var compile, scope, element;

    beforeEach(module('motech-scheduler'));

    beforeEach(inject(function ($compile, $rootScope, $httpBackend, $templateCache) {
        $httpBackend.when('GET', '/server/status/status.html').respond('');
        $httpBackend.when('GET', 'http://localhost:8080/motech-platform-server/server/bootstrap/status').respond({});
        $httpBackend.expect('GET', 'scheduler/period-modal.html').respond('');

        compile = $compile;
        scope = $rootScope.$new();

        element = angular.element('<period-modal></period-modal>');
        compile(element)(scope);
        scope.$digest();
    }));

    it('should have proper tag name and node type', function () {
        expect(element.prop("tagName")).toEqual("PERIOD-MODAL");
        expect(element.nodeType).toEqual(element.ELEMENT_NODE);
    });

});
