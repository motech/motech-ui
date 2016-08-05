describe('Email log Controller', function() {
    var scope, controller;

    beforeEach(module('motech-email'));
    beforeEach(inject(function($rootScope, $controller){
        scope = $rootScope.$new();
        controller = $controller('EmailLogsController', {$scope: scope});
    }));

    it('should return good data from scope.checkboxes', function() {
        expect(scope.checkboxes[0]).toEqual({label: "email.logging.error", value: "ERROR"});
        expect(scope.checkboxes[1]).toEqual({label: "email.logging.sent", value: "SENT"});
        expect(scope.checkboxes[2]).toEqual({label: "email.logging.received", value: "RECEIVED"});
        expect(scope.checkboxes[0].value).toEqual("ERROR");
    });

    it('should be able to set scope.logs ', function() {
        expect(scope.logs).toBeUndefined();
        scope.updateRows(4);
        expect(scope.logs).toBeDefined();
        expect(scope.logs).toEqual(4);
        scope.updateRows();
        expect(scope.logs).toBeUndefined();
    });
});