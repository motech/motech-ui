describe("Service: Status Server Service", function () {
    var scope, rootScope, q, http, httpBackend, ServerStatusService, ServerService;
    beforeEach(function () {
        module('motech-server');
        module('motech-templates');
    });

    beforeEach(inject(function ($rootScope, $q, $http, $httpBackend, _ServerStatusService_, _ServerService_) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        httpBackend = $httpBackend;
        q = $q;
        http = $http;
        ServerStatusService = _ServerStatusService_;
        ServerService = _ServerService_;
    }));

    beforeEach(function(){
        spyOn(ServerStatusService, 'getStatus').and.callThrough();
    });

    it("should injects service 'ServerStatusService'", function () {
        expect(ServerStatusService).toBeDefined();
    });

    it("should injects service 'ServerService'", function () {
        expect(ServerService).toBeDefined();
    });

    it("should broadcast 'motech.statusCheck.start'", function() {
        spyOn(rootScope, '$broadcast');
        ServerStatusService.getStatus();
        expect(rootScope.$broadcast).toHaveBeenCalledWith('motech.statusCheck.start');
    });

    it("should check if server is running", function() {
        ServerStatusService.running = true;
        expect(ServerStatusService.isRunning()).toBeTruthy();
        ServerStatusService.running = false;
        expect(ServerStatusService.isRunning()).toBeFalsy();
    });

    it("should check if server is loaded", function() {
        ServerStatusService.running = true;
        ServerStatusService.startedPercentage = 100;
        expect(ServerStatusService.isLoaded()).toBeTruthy();
        ServerStatusService.running = false;
        expect(ServerStatusService.isLoaded()).toBeFalsy();
        ServerStatusService.running = true;
        ServerStatusService.startedPercentage = 99;
        expect(ServerStatusService.isLoaded()).toBeFalsy();
    });

    it("should check if server has errors", function() {
        ServerStatusService.errors = [];
        expect(ServerStatusService.hasErrors()).toBeFalsy();
        ServerStatusService.errors.push("Could not reach MOTECH server");
        ServerStatusService.errors.push("Could not reach MOTECH server2");
        expect(ServerStatusService.errors.length).toEqual(2);
        expect(ServerStatusService.errors[0]).toEqual("Could not reach MOTECH server");
        expect(ServerStatusService.hasErrors()).toBe(true);
    });

});