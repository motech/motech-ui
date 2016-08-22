describe('Reset password Controller', function() {
    var scope;
    var LoginModal;
    var ResetPasswordModal;
    var ResetFormCtrl;

    beforeEach(module('motech-auth'));

    beforeEach(inject(function($controller, _LoginModal_, _ResetPasswordModal_) {
        LoginModal = _LoginModal_;
        ResetPasswordModal = _ResetPasswordModal_;
        ResetFormCtrl = $controller('resetFormController');
    }));

    it('should call open LoginModal Service method', function() {
        spyOn(LoginModal, 'open');
        ResetFormCtrl.backToLogin();
        expect(LoginModal.open).toHaveBeenCalled();
    });

    it('should call close ResetPasswordModal Service method', function() {
        spyOn(ResetPasswordModal, 'close');
        ResetFormCtrl.backToLogin();
        expect(ResetPasswordModal.close).toHaveBeenCalled();
    });

    it('should POST forgot email to the server', function() {
        var email = {
            "email": "test@test.com"
        };
        spyOn(ResetFormCtrl, 'sendReset');
        ResetFormCtrl.sendReset(email);
        expect(ResetFormCtrl.sendReset).toHaveBeenCalledWith(email);
    });

});
