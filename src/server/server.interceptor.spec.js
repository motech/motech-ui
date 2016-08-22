describe('Server interceptor factory', function() {
    var motechServerHTTPInterceptor;

    beforeEach(module('motech-server'));
    beforeEach(inject(function($injector) {
        motechServerHTTPInterceptor = $injector.get('motechServerHTTPInterceptor');
    }));

    it('should be define motechServerHTTPInterceptor', function() {
        expect(motechServerHTTPInterceptor).toBeDefined();
    });

    it('should set withCredentials and X-Requested-With, when url is correct', function() {
        var config = {
            headers: {
                Accept: "application/json, text/plain, */*",
                'X-Requested-With': ""
            },
            method: "GET",
            url: "http://localhost:8080/motech-platform-server/module/admin/api/bundles",
            withCredentials: false
        };
        var newConfig = motechServerHTTPInterceptor.request(config);
        expect(newConfig.withCredentials).toEqual(true);
        expect(newConfig.headers['X-Requested-With']).toEqual("XMLHttpRequest");
    });

    it('should not set withCredentials and X-Requested-With, when url is not correct', function() {
        var config = {
            headers: {
                Accept: "application/json, text/plain, */*",
                'X-Requested-With': ""
            },
            method: "GET",
            url: "http://lsdocalhost:8080/motech-platform-server/module/admin/api/bundles",
            withCredentials: false
        };
        var newConfig = motechServerHTTPInterceptor.request(config);
        expect(newConfig.withCredentials).toEqual(false);
        expect(newConfig.headers['X-Requested-With']).toEqual("");
    });

    it('should set data, when url is correct and value of Content-Type is "application/x-www-form-urlencoded; charset=UTF-8"', function() {
        var config = {
            headers: {
                Accept: "application/json, text/plain, */*",
                'X-Requested-With': "",
                'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
            },
            method: "GET",
            url: "http://localhost:8080/motech-platform-server/module/admin/api/bundles",
            withCredentials: false,
            data: "hello"
        };
        var newConfig = motechServerHTTPInterceptor.request(config);
        expect(newConfig.data).toEqual("0=h&1=e&2=l&3=l&4=o");
    });
});