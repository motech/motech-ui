describe('Reset password Controller', function() {

    var scope;
    var LoginModalMock;
    var ResetPasswordModalMock;
    var ResetFormCtrl;

    beforeEach(module('motech-auth'));

    beforeEach(function() {
        LoginModalMock = {
            open: function() {},
            close: function() {}
        };
        ResetPasswordModalMock = {
            open: function() {},
            close: function() {}
        };
    });

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ResetFormCtrl = $controller('resetFormController', {
            $scope: scope,
            LoginModal: LoginModalMock,
            ResetPasswordModal: ResetPasswordModalMock
        });
    }));

    it('should call open LoginModal Service method', function() {
        spyOn(LoginModalMock, 'open');
        scope.backToLogin();
        expect(LoginModalMock.open).toHaveBeenCalled();
    });

    it('should call close ResetPasswordModal Service method', function() {
        spyOn(ResetPasswordModalMock, 'close');
        scope.backToLogin();
        expect(ResetPasswordModalMock.close).toHaveBeenCalled();
    });

    it('should POST forgot email to the server', function() {
        var email = {
            "email": "test@test.com"
        };
        spyOn(scope, 'sendReset');
        scope.sendReset(email);
        expect(scope.sendReset).toHaveBeenCalledWith(email);
    });

});
