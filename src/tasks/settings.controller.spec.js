describe('Tasks settings Controller', function () {
    var scope,
        deferred,
        ModalFactory,
        tasksSettings = {
            $save: function () {}
        };

    beforeEach(module('motech-tasks'));

    beforeEach(inject(function($controller, $rootScope, $q, $httpBackend, _ModalFactory_) {
        $httpBackend.when('GET', '/server/status/status.html').respond({});
        $httpBackend.when('GET', 'http://localhost:8080/motech-platform-server/server/bootstrap/status').respond({});
        scope = $rootScope.$new();
        ModalFactory = _ModalFactory_;
        deferred = $q.defer();

        spyOn(tasksSettings, '$save').and.returnValue(deferred.promise);
        spyOn(ModalFactory, 'showSuccessAlert');
        spyOn(ModalFactory, 'showErrorAlert');

        $controller('TasksSettingsController', {
            $scope: scope,
            tasksSettings: tasksSettings
        });
    }));

    it('should save settings', function () {
        deferred.resolve('');
        scope.submit();
        scope.$digest();

        expect(tasksSettings.$save).toHaveBeenCalled();
        expect(ModalFactory.showSuccessAlert).toHaveBeenCalled();
        expect(ModalFactory.showErrorAlert).not.toHaveBeenCalled();
    });

    it('should not save settings', function () {
        deferred.reject();
        scope.submit();
        scope.$digest();

        expect(tasksSettings.$save).toHaveBeenCalled();
        expect(ModalFactory.showSuccessAlert).not.toHaveBeenCalled();
        expect(ModalFactory.showErrorAlert).toHaveBeenCalled();
    });

    it('should be numeric', function () {
        var prop = 'test';
        scope.settings[prop] = '22';

        expect(scope.isNumeric(prop)).toBe(true);
    });

    it('should not be numeric', function () {
        var prop = 'test';
        scope.settings[prop] = 'not_numeric';

        expect(scope.isNumeric(prop)).toBe(false);
    });

});
