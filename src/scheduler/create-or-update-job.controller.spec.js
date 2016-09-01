describe('Create or update job Controller', function () {
    var scope,
        controller,
        timeout,
        JobsService,
        ModalFactory,
        MotechAlert,
        LoadingModal,
        MotechAlertSpy,
        i18nService;

    Date.prototype.addDays = function(days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };

    beforeEach(module('motech-scheduler'));

    beforeEach(inject(function ($rootScope, $controller, _JobsService_, _ModalFactory_, _LoadingModal_, _i18nService_) {
        MotechAlertSpy = jasmine.createSpy('MotechAlertSpy');
        scope = $rootScope.$new();
        scope.action = 'edit';
        controller = $controller('CreateOrUpdateJobController', {
            $scope: scope,
            JobsService: _JobsService_,
            $stateParams: { jobName: null },
            ModalFactory: _ModalFactory_,
            LoadingModal: _LoadingModal_,
            MotechAlert: MotechAlertSpy,
        });
        JobsService = _JobsService_;
        ModalFactory = _ModalFactory_;
        LoadingModal = _LoadingModal_;
        i18nService = _i18nService_;
    }));

    it('should set scope.jobTypes', function() {
        expect(scope.jobTypes).toEqual([
            { displayName: "Cron", name: "CRON" },
            { displayName: "Repeating", name: "REPEATING" },
            { displayName: "Repeating Period", name: "REPEATING_PERIOD"},
            { displayName: "Run Once", name: "RUN_ONCE" },
            { displayName: "Day of Week", name: "DAY_OF_WEEK" }
        ]);
    });

    it('should set scope.days', function() {
        expect(scope.days).toEqual([
            { label: "Monday", value: "0" },
            { label: "Tuesday", value: "1" },
            { label: "Wednesday", value: "2" },
            { label: "Thursday", value: "3" },
            { label: "Friday", value: "4" },
            { label: "Saturday", value: "5" },
            { label: "Sunday", value: "6" }
        ]);
    });

    describe('resetMap method', function () {
        it('should show confirm', function () {
            spyOn(ModalFactory, 'showConfirm');
            scope.motechEventParameters = { test: 'test' };
            scope.resetMap();

            expect(ModalFactory.showConfirm).toHaveBeenCalled();
        });
    });

    describe('getMinDate method', function () {
        it('should return formatted date', function () {
            expect(scope.getMinDate("RUN_ONCE")).not.toBeNull();
            expect(scope.getMinDate("RUN_ONCE")).toBeTruthy();
        });

        it('should return null', function () {
            expect(scope.getMinDate()).toBeNull();
        });
    });

    describe('create or update job method', function () {
        it('should execute MotechAlert with good parameters if scope.dates.startDate is before scope.dates.endDate', function () {
            var currentDate = new Date();
            scope.dates.startDate = scope.parseDateToString(currentDate);
            scope.dates.endDate = scope.parseDateToString(currentDate.addDays(1));

            scope.createOrUpdateJob();

            expect(MotechAlertSpy).not.toHaveBeenCalledWith(
                i18nService.getMessage("scheduler.error.endDateBeforeStartDate",
                                       [scope.dates.startDate, scope.dates.endDate]), "scheduler.error");
        });

        it('should not execute MotechAlert with good parameters if scope.dates.startDate is after scope.dates.endDate', function () {
            var currentDate = new Date();
            scope.dates.endDate = scope.parseDateToString(currentDate);
            scope.dates.startDate = scope.parseDateToString(currentDate.addDays(1));

            scope.createOrUpdateJob();

            expect(MotechAlertSpy).toHaveBeenCalledWith(
                i18nService.getMessage("scheduler.error.endDateBeforeStartDate",
                                       [scope.dates.startDate, scope.dates.endDate]), "scheduler.error");
        });

        it('should open LoadingModal and execute JobsService.createJob if action is "new"', function () {
            spyOn(LoadingModal, 'open');
            spyOn(JobsService, 'createJob');

            scope.createOrUpdateJob('new');

            expect(LoadingModal.open).toHaveBeenCalled();
            expect(JobsService.createJob).toHaveBeenCalled();
        });

        it('should not open LoadingModal and execute JobsService.createJob if action is not "new"', function () {
            spyOn(LoadingModal, 'open');
            spyOn(JobsService, 'createJob');

            scope.createOrUpdateJob();
            scope.createOrUpdateJob('edit');

            expect(LoadingModal.open).not.toHaveBeenCalled();
            expect(JobsService.createJob).not.toHaveBeenCalled();
        });

        it('should show confirm if action is "edit"', function () {
            spyOn(ModalFactory, 'showConfirm');

            scope.createOrUpdateJob('edit');

            expect(ModalFactory.showConfirm).toHaveBeenCalled();
        });

        it('should not show confirm if action is not "edit"', function () {
            spyOn(ModalFactory, 'showConfirm');

            scope.createOrUpdateJob();
            scope.createOrUpdateJob('new');

            expect(ModalFactory.showConfirm).not.toHaveBeenCalled();
        });

    });

    it('should delete properties from scope.job', function () {
        scope.job['@jobType'] = 'test';
        scope.job.motechEvent = 'test2';
        scope.job.startDate = 'test3';
        scope.job.other = 'test4';

        scope.typeChanged();

        expect(scope.job['@jobType']).toEqual('test');
        expect(scope.job.motechEvent).toEqual('test2');
        expect(scope.job.startDate).toEqual('test3');
        expect(scope.job.other).not.toEqual('test4');
        expect(scope.job.other).toBeFalsy();
    });

    it('should parse date to string', function () {
        var date = new Date(2016, 0, 1, 0, 0, 0, 0);
        var parsedDate = scope.parseDateToString(date);
        expect(parsedDate).toEqual('2016-01-01 00:00:00');
    });


});
