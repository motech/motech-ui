describe('Job list Controller', function () {
    var rootScope,
        scope,
        controller,
        JobsService,
        ModalFactory;

    beforeEach(module('motech-scheduler'));

    beforeEach(inject(function ($rootScope, $controller, _JobsService_, _ModalFactory_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        controller = $controller('JobListController', {
            $scope: scope,
            JobsService: _JobsService_,
            ModalFactory: _ModalFactory_
        });
        JobsService = _JobsService_;
        ModalFactory = _ModalFactory_;
    }));

    it('should set scope.activityCheckboxes', function() {
        expect(scope.activityCheckboxes).toEqual([
            {label: 'scheduler.active', value: 'ACTIVE'},
            {label: 'scheduler.finished', value: 'FINISHED'},
            {label: 'scheduler.notstarted', value: 'NOTSTARTED'}
        ]);
    });

    it('should set scope.statusCheckboxes', function() {
        expect(scope.statusCheckboxes).toEqual([
            {label: 'scheduler.ok', value: 'OK'},
            {label: 'scheduler.paused', value: 'PAUSED'},
            {label: 'scheduler.blocked', value: 'BLOCKED'},
            {label: 'scheduler.error', value: 'ERROR'}
        ]);
    });

    it('on jobsFetched should call JobsService.get and assign properties to scope', function () {
        var jobs = {
            records: 50,
            page: 2,
            total: 5
        };

        spyOn(JobsService, 'get').and.returnValue(jobs);
        rootScope.$broadcast('jobsFetched');
        expect(JobsService.get).toHaveBeenCalled();
        expect(scope.totalItems).toEqual(jobs.records);
        expect(scope.currentPage).toEqual(jobs.page);
        expect(scope.totalPages).toEqual(jobs.total);
    });

    it('should change page', function () {
        var page = 5;
        spyOn(JobsService, 'setParam');
        scope.changePageTo(page);
        expect(JobsService.setParam).toHaveBeenCalledWith('page', page);
    });

    it('should execute JobsService.getDetails after call scope.getDetails if scope.jobDetails[job.name] is undefined and job.uiDefined is false', function () {
        var job = {
            name: 'john',
            uiDefined: false
        };

        scope.jobDetails[job.name] = undefined;
        spyOn(JobsService, 'getDetails');
        scope.getDetails(job);
        expect(JobsService.getDetails).toHaveBeenCalled();
    });

    it('should update job', function () {
        var job = {};
        var updated = {
            activity: 'activity',
            status: 'status',
            name: 'name',
            group: 'group',
            startDate: new Date(),
            nextFireDate: new Date(),
            endDate: new Date(),
            jobType: 'type',
            info: 'info',
            uiDefined: true
        };

        scope.updateJob(job, updated);
        expect(job).toEqual(updated);
    });

    it('should pause job', function () {
        var confirmPause,
            confirm;

        spyOn(ModalFactory, 'showConfirm').and.callFake(function (confirmPause_, confirm_, callback) {
            callback.call(this, true);
            confirmPause = confirmPause_;
            confirm = confirm_;
        });
        spyOn(JobsService, 'pauseJob');
        scope.pauseJob({});
        expect(ModalFactory.showConfirm).toHaveBeenCalled();
        expect(JobsService.pauseJob).toHaveBeenCalled();
        expect(confirmPause).toEqual('scheduler.confirm.pause');
        expect(confirm).toEqual('scheduler.confirm');

    });

    it('should resume job', function () {
        var confirmResume,
            confirm;

        spyOn(ModalFactory, 'showConfirm').and.callFake(function (confirmPause_, confirm_, callback) {
            callback.call(this, true);
            confirmResume = confirmPause_;
            confirm = confirm_;
        });
        spyOn(JobsService, 'resumeJob');
        scope.resumeJob({});
        expect(ModalFactory.showConfirm).toHaveBeenCalled();
        expect(JobsService.resumeJob).toHaveBeenCalled();
        expect(confirmResume).toEqual('scheduler.confirm.resume');
        expect(confirm).toEqual('scheduler.confirm');
    });

    it('should delete job and set good param for jobs', function () {
        var confirmResume,
            confirm;
        scope.jobs = {};
        scope.jobs.rows = {};
        scope.jobs.rows.length = 1;
        scope.jobs.page = 5;

        spyOn(ModalFactory, 'showConfirm').and.callFake(function (confirmPause_, confirm_, callback) {
            callback.call(this, true);
            confirmResume = confirmPause_;
            confirm = confirm_;
        });
        spyOn(JobsService, 'deleteJob');
        spyOn(JobsService, 'setParam');
        scope.deleteJob({});
        expect(ModalFactory.showConfirm).toHaveBeenCalled();
        expect(confirmResume).toEqual('scheduler.confirm.delete');
        expect(confirm).toEqual('scheduler.confirm');
        expect(JobsService.deleteJob).toHaveBeenCalled();
        expect(JobsService.setParam).toHaveBeenCalledWith('page', scope.jobs.page - 1);

    });

    it('should not set param for jobs', function () {
        scope.jobs = {};
        scope.jobs.rows = {};
        scope.jobs.rows.length = 2;
        scope.jobs.page = 5;

        spyOn(ModalFactory, 'showConfirm').and.callFake(function (confirmPause_, confirm_, callback) {
            callback.call(this, true);
        });
        spyOn(JobsService, 'deleteJob');
        spyOn(JobsService, 'setParam');
        scope.deleteJob({});
        expect(ModalFactory.showConfirm).toHaveBeenCalled();
        expect(JobsService.setParam).not.toHaveBeenCalled();
    });

});
