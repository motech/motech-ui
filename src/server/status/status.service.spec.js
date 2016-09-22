describe("Service: Status Server Service", function () {
    var scope, rootScope, q, http, httpBackend, ServerStatusService, ServerService, bundleId;
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
        bundleId = "org.motechproject.motech-platform-server-bundle";
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

    it("should check if server has errors loading", function() {
        ServerStatusService.errors = [];
        expect(ServerStatusService.hasErrors()).toBeFalsy();
        ServerStatusService.errors.push("ERROR [org.eclipse.gemini.blueprint.extender.internal.dependencies.startup.DependencyWaiterApplicationContextExecutor]");
        ServerStatusService.errors.push("ERROR Unable to create application context for [org.motechproject.motech-platform-server-bundle]");
        expect(ServerStatusService.hasErrors()).toBe(true);
        ServerStatusService.osgiStartedBundles = ["org.motechproject.motech-platform-server-bundle", "org.motechproject.motech-email"];
        ServerStatusService.inFatalError = false;
        expect(ServerStatusService.isBundleStarting(bundleId)).toBe(true);
        ServerStatusService.inFatalError = true;
        expect(ServerStatusService.isBundleStarting(bundleId)).toBe(false);
    });

    it("should check if specific bundle has error", function() {
        ServerStatusService.contextErrorsByBundle = {};
        expect(ServerStatusService.hasBundleError(bundleId)).toBe(false);
        ServerStatusService.contextErrorsByBundle = {"org.motechproject.motech-platform-server-bundle": "ERROR org.motechproject.osgi.web.ModuleRegistrationDatadfgjdgddgdfgdf not found from bundle [org.motechproject.motech-platform-server-bundle]"};
        expect(ServerStatusService.hasBundleError(bundleId)).toBe(true);
    });

    it("should check if specific bundle is started", function() {
        ServerStatusService.inFatalError = false;
        ServerStatusService.startedBundles = ["org.motechproject.motech-platform-server", "org.motechproject.motech-platform-server-bundle"];
        expect(ServerStatusService.isBundleStarted(bundleId)).toBe(true);
    });

    it("should check if specific bundle is starting or not starting", function() {
        ServerStatusService.inFatalError = false;
        ServerStatusService.osgiStartedBundles = ["org.motechproject.motech-platform-server-bundle"];
        expect(ServerStatusService.isBundleStarting(bundleId)).toBe(true);
        ServerStatusService.osgiStartedBundles = ["motech-platform-server-bundle"];
        expect(ServerStatusService.isBundleStarting(bundleId)).toBe(false);
    });
});