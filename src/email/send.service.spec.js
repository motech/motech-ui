describe('Email send service', function() {
    var EmailSendService;

    beforeEach(module('motech-email'));
    beforeEach(inject(function( _EmailSendService_) {
        EmailSendService = _EmailSendService_;
    }));

    it('should execute sendEmail with good parameters, two times', function() {
        var meesage= { name : "Damian" };
        spyOn(EmailSendService, "send");
        EmailSendService.send(meesage);
        expect(EmailSendService.send).toHaveBeenCalledWith(meesage);
        EmailSendService.send("hello");
        expect(EmailSendService.send).toHaveBeenCalledWith("hello");
        expect(EmailSendService.send.calls.count()).toEqual(2);
    });
});