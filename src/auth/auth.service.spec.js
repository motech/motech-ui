describe('Auth Service', function () {
    var AuthService;

    beforeEach(module('motech-auth'));
    beforeEach(inject(function (_AuthService_) {
        AuthService = _AuthService_;
    }));

    it('should execute login with good parameters', function () {
        var username = "test";
        var password = "test";
        spyOn(AuthService, "login");
        AuthService.login(username, password);
        expect(AuthService.login).toHaveBeenCalledWith(username, password);
    });

    it('should execute getCurrentUser', function() {
        spyOn(AuthService, "getCurrentUser");
        AuthService.getCurrentUser();
        expect(AuthService.getCurrentUser).toHaveBeenCalled();
    });

    it('should execute logout', function() {
        spyOn(AuthService, "logout");
        AuthService.logout();
        expect(AuthService.logout).toHaveBeenCalled();
    });

});
