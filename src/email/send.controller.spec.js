describe('Email Send Controller', function() {
    var scope, controller, $q, emailSendService;

    beforeEach(module('motech-email'));
    beforeEach(inject(function($rootScope, $controller, _$q_, EmailSendService){
        scope = $rootScope.$new();
        controller = $controller('EmailSendController', {
            $scope: scope,
        });
        $q = _$q_;
        emailSendService = EmailSendService;
    }));

    it('should execute EmailSendService.send function', function() {
        scope.mail = {
            fromAddress : "motech@motech.com",
            message : "<p>hello world/p>",
            subject : "Hello",
            toAddress : "test@gmail.com"
        };
        var deferred = $q.defer();
        spyOn(emailSendService, 'send').and.returnValue(deferred.promise);
        scope.sendEmail();
        expect(emailSendService.send).toHaveBeenCalled();
    });
});