describe('Server service', function() {
    var ServerService;

    beforeEach(module('motech-server'));
    beforeEach(inject(function( _ServerService_) {
        ServerService = _ServerService_;
    }));

    it('should return correct url', function() {
        var localhost = "http://localhost:8080/motech-platform-server/";
        var uri = "email/logs";
        var newUri = ServerService.formatURL(uri);
        expect(newUri).toEqual(localhost + uri);

        uri = "email/logs/";
        newUri = ServerService.formatURL(uri);
        expect(newUri).toEqual(localhost + uri);
    });

    it('should check the url is correct, beginning with "http://localhost:8080/motech-platform-server/"', function() {
        var localhost = "http://localhost:8080/motech-platform-server/";
        var uri = "scheduler/createOrUpdateJob?action=new";
        var isServerUrl = ServerService.isURL(localhost);
        expect(isServerUrl).toEqual(true);

        isServerUrl = ServerService.isURL(localhost + uri);
        expect(isServerUrl).toEqual(true);

        isServerUrl = ServerService.isURL(uri + localhost);
        expect(isServerUrl).toEqual(false);

        localhost = "http://localhost:8080/motech-platform-server";
        isServerUrl = ServerService.isURL(localhost);
        expect(isServerUrl).toEqual(false);

        localhost = "localhost:8080/motech-platform-server/";
        isServerUrl = ServerService.isURL(localhost);
        expect(isServerUrl).toEqual(false);
    });

    it('should set ready', function() {
        var isReady = ServerService.isReady();
        expect(isReady).toEqual(false);

        ServerService.setReady(true);
        isReady = ServerService.isReady();
        expect(isReady).toEqual(true);
    });

    it('should execute whenReady() and return deferred.promise', function() {
        ServerService.setReady(false);
        var def = ServerService.whenReady();
        expect(def.$$state).toEqual(Object({ status: 0 }));

        ServerService.setReady(true);
        def = ServerService.whenReady();
        expect(def.$$state).toEqual(Object({ status: 1, value: true }));
    });
});