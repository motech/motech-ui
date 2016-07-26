(function () {
    'use strict';

    /**
     * @memberOf motech-scheduler
     * @ngdoc controller
     * @name  JobListController
     *
     * @description
     * Controls behaviour of the job list which means viewing details about jobs, switching between pages if there is more than one page and loading filtered job list. What is more, it enables adding, editing, pausing, starting and deleting jobs.
     *
     */

    angular.module('motech-scheduler')
            .controller('JobListController', jobListController);

    jobListController.$inject = ['$scope', '$timeout', 'JobsService', 'ModalFactory', 'LoadingModal', 'i18nService'];
    function jobListController ($scope, $timeout, JobsService, ModalFactory, LoadingModal, i18nService) {
        $scope.jobDetails = {};

        $scope.activityCheckboxes = [
            {label: 'scheduler.active', value: "ACTIVE"},
            {label: 'scheduler.finished', value: "FINISHED"},
            {label: 'scheduler.notstarted', value: "NOTSTARTED"}
        ];

        $scope.statusCheckboxes = [
            {label: 'scheduler.ok', value: "OK"},
            {label: 'scheduler.paused', value: "PAUSED"},
            {label: 'scheduler.blocked', value: "BLOCKED"},
            {label: 'scheduler.error', value: "ERROR"}
        ];

        $scope.search = {};
        $scope.$watch('search', updateSearch, true);

        $scope.$on('jobsFetched', function() {
            LoadingModal.open();
            $scope.jobs = JobsService.get();
            $scope.totalItems = $scope.jobs.records;
            $scope.currentPage = $scope.jobs.page;
            $scope.totalPages = $scope.jobs.total;
            LoadingModal.close();
        });

        JobsService.setListener($scope);

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

        $scope.editJob = editJob;

        /**
         * Sets job which will be available for edition.
         *
         * @memberOf JobListController
         *
         * @param {Object} job Unique job from job list which certain edit button refers to.
         */

        function editJob(job) {
            JobsService.setCurrentJob(job);
        }

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
                return "icon-start";
            } else if (status === "PAUSED") {
                return "icon-pause";
            } else if (status === "BLOCKED") {
                return "icon-ban";
            } else if (status === "ERROR") {
                return "icon-error";
            }
            return undefined;
        };

        $scope.getStatus = function(status) {
            if (status === "OK") {
                return "scheduler.ok";
            } else if (status === "PAUSED") {
                return "scheduler.paused";
            } else if (status === "BLOCKED") {
                return "scheduler.blocked";
            } else if (status === "ERROR") {
                return "scheduler.error";
            }
            return undefined;
        };

        $scope.getActivityIcon = function(activity) {
            if (activity === "NOTSTARTED") {
                return "icon-clock";
            } else if (activity === "ACTIVE") {
                return "icon-start";
            } else if (activity === "FINISHED") {
                return "icon-check";
            }
            return undefined;
        };

        $scope.getActivity = function(activity) {
            if (activity === "NOTSTARTED") {
                return "scheduler.notstarted";
            } else if (activity === "ACTIVE") {
                return "scheduler.active";
            } else if (activity === "FINISHED") {
                return "scheduler.finished";
            }
            return undefined;
        };
    }

}());

