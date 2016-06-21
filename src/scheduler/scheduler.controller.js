(function () {

    'use strict';

    angular.module('motech-scheduler')
            .controller('SchedulerController', schedulerController);

    schedulerController.$inject = ['$scope', '$timeout', 'JobsService', 'ModalFactory', 'LoadingModal', 'i18nService'];
    function schedulerController ($scope, $timeout, JobsService, ModalFactory, LoadingModal, i18nService) {

        $scope.jobDetails = {};

        $scope.search = {};
        $scope.$watch('search', updateSearch, true);

        $scope.$on('jobsFetched', function() {
            $scope.jobs = JobsService.get();
            $scope.totalItems = $scope.jobs.records;
            $scope.currentPage = $scope.jobs.page;
            $scope.totalPages = $scope.jobs.total;
            LoadingModal.close();
        });

        JobsService.setListener($scope);
        JobsService.fetchJobs({});

        $scope.changePageTo = changePageTo;

        function changePageTo(page){
            JobsService.setParam("page", page);
            JobsService.fetchJobs();
        }

        var searchUpdateTimeout;
        function updateSearch(searchData){

            if(searchUpdateTimeout){
                clearTimeout(searchUpdateTimeout);
                searchUpdateTimeout=null;
            }
            searchUpdateTimeout = setTimeout(function() {
                JobsService.setParam("name", searchData.name);
                JobsService.setParam("activity", searchData.activity);
                JobsService.setParam("status", searchData.status);
                JobsService.setParam("timeFrom", searchData.timeFrom);
                JobsService.setParam("timeTo", searchData.timeTo);
                JobsService.fetchJobs();
            }, 1000);
        }

        $scope.getDetails = function(job) {
            if ($scope.jobDetails[job.name] !== undefined) {
            } else {
                if (!job.uiDefined) {
                    JobsService.getDetails(job, function(data) {
                        $scope.jobDetails[job.name] = data;
                    });
                }
            }
        };

        $scope.updateJob = function(job, updated) {
            job.activity = updated.activity;
            job.status = updated.status;
            job.name = updated.name;
            job.group = updated.group;
            job.startDate = updated.startDate;
            job.nextFireDate = updated.nextFireDate;
            job.endDate = updated.endDate;
            job.jobType = updated.jobType;
            job.info = updated.info;
            job.uiDefined = updated.uiDefined;
        };

        $scope.pauseJob = function(job) {
            ModalFactory.showConfirm("scheduler.confirm.pause", "scheduler.confirm", function(response) {
                if (response) {
                    LoadingModal.open();
                    JobsService.pauseJob(job, function(updated) {
                        $scope.updateJob(job, updated);
                        LoadingModal.close();
                    });
                }
            });
        };

        $scope.resumeJob = function(job) {
            ModalFactory.showConfirm("scheduler.confirm.resume", "scheduler.confirm", function(response) {
                if (response) {
                    LoadingModal.open();
                    JobsService.resumeJob(job, function(updated) {
                       $scope.updateJob(job, updated);
                       LoadingModal.close();
                    });
                }
            });
        };

        $scope.newJob = function() {
            LoadingModal.open();
        };

        $scope.editJob = function(job) {
            JobsService.setCurrentJob(job);
            LoadingModal.open();
        };

        $scope.deleteJob = function(job) {
            ModalFactory.showConfirm("scheduler.confirm.delete", "scheduler.confirm", function(response) {
                if (response) {
                    LoadingModal.open();
                    // Go back to previous page when deleting last record on the given page
                    if ($scope.jobs.rows.length === 1 && $scope.jobs.page > 1) {
                        JobsService.setParam("page", $scope.jobs.page - 1);
                    }
                    JobsService.deleteJob(job, function() {
                        JobsService.fetchJobs();
                    });
                }
            });
        };

        $scope.getStatusIcon = function(status) {
            if (status === "OK") {
                return "play";
            } else if (status === "PAUSED") {
                return "pause";
            } else if (status === "BLOCKED") {
                return "ban";
            } else if (status === "ERROR") {
                return "exclamation-triangle";
            }
            return undefined;
        };

        $scope.getActivityIcon = function(activity) {
            if (activity === "NOTSTARTED") {
                return "clock-o";
            } else if (activity === "ACTIVE") {
                return "play";
            } else if (activity === "FINISHED") {
                return "check";
            }
            return undefined;
        };
    }

}());

