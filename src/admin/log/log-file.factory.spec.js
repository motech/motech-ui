describe('Log-file factory', function() {
    var scope, serverService, logFileFactory, httpBackend;

    beforeEach(module('motech-admin'));
    beforeEach(module('motech-templates'));

    beforeEach(inject(function($rootScope, $httpBackend, _ServerService_, _LogFileFactory_) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        serverService = _ServerService_;
        logFileFactory = _LogFileFactory_;

        serverService.setReady(true);
    }));

    beforeEach(function() {
        httpBackend.when('GET', serverService.formatURL('/module/admin/api/log'))
            .respond("motech-log-file-text");
    });

    beforeEach(function() {
        httpBackend.when('GET', 'i18n-messages/motech-messages.en.json').respond([]);
        httpBackend.when('GET', serverService.formatURL('/module/server/lang/locate')).respond([]);
        httpBackend.when('GET', serverService.formatURL('/module/server/lang/list')).respond([]);
        httpBackend.when('GET', serverService.formatURL('/module/server/lang')).respond( function() {
            return ["en"];
        });
    });

    it("should injects service 'ServerService'", function () {
        expect(serverService).toBeDefined();
    });

    it("should injects service 'LogFileFactory'", function () {
        expect(logFileFactory).toBeDefined();
    });

    it("should injects service 'httpBackend'", function () {
        expect(httpBackend).toBeDefined();
    });

    it("Should send request to specific endpoint and receive specific object", function () {
        spyOn(logFileFactory, "getLog").and.callThrough();
        var result = null;
        logFileFactory.getLog()
            .then(function (response) {
                result = response;
            });
        httpBackend.flush();
        expect(result).toEqual("motech-log-file-text");
        expect(logFileFactory.getLog).toHaveBeenCalled();
    });

});