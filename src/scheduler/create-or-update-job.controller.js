(function () {

    'use strict';

    angular.module('motech-scheduler')
            .controller('CreateOrUpdateJobController', createOrUpdateJobController);

    createOrUpdateJobController.$inject = ['$scope', '$timeout', '$compile', '$state', '$stateParams', 'JobsService', 'ModalFactory', 'LoadingModal', 'i18nService', 'MotechAlert', 'ModalWindow'];
    function createOrUpdateJobController ($scope, $timeout, $compile, $state, $stateParams, JobsService, ModalFactory, LoadingModal, i18nService, MotechAlert, ModalWindow) {

        LoadingModal.open();

        $scope.job = {};
        $scope.job.motechEvent = {};
        $scope.motechEventParameters = {};
        $scope.action = $stateParams.action;
        $scope.dates = {};

        $scope.jobTypes = [
            { displayName: "Cron", name: "CRON" },
            { displayName: "Repeating", name: "REPEATING" },
            { displayName: "Repeating Period", name: "REPEATING_PERIOD"},
            { displayName: "Run Once", name: "RUN_ONCE" },
            { displayName: "Day of Week", name: "DAY_OF_WEEK" }
        ];

        $scope.days = [
            { label: "Monday", value: "0" },
            { label: "Tuesday", value: "1" },
            { label: "Wednesday", value: "2" },
            { label: "Thursday", value: "3" },
            { label: "Friday", value: "4" },
            { label: "Saturday", value: "5" },
            { label: "Sunday", value: "6" }
        ];

        $scope.resetMap = function() {
            ModalFactory.showConfirm("scheduler.confirm.resetMap", "scheduler.confirm", function(response) {
                if (response) {
                    $timeout(function() {
                        $scope.motechEventParameters = {};
                    });
                }
            });
        };

        $scope.getMinDate = function(jobType) {
            if (jobType === "RUN_ONCE") {
                return moment().format("YYYY-MM-DD HH:mm:ss");
            }

            return null;
        };

        $scope.createOrUpdateJob = function(action) {
            var job = {};

            job.motechEvent = {};

            for (var field in $scope.job) {
                job[field] = $scope.job[field];
            }

            job.motechEvent.parameters = {};

            angular.forEach($scope.motechEventParameters, function(property, parameter) {
                job.motechEvent.parameters[parameter] = property;
            });

            if ($scope.dates.startDate && $scope.dates.endDate) {
                if ($scope.dates.startDate >= $scope.dates.endDate) {
                    MotechAlert(i18nService.getMessage("scheduler.error.endDateBeforeStartDate", [$scope.dates.startDate, $scope.dates.endDate]), "scheduler.error");
                    return;
                }
            }

            if ($scope.job.days) {
                for (var day = 0; day < $scope.job.days.length; day += 1) {
                    if (day === 0) {
                        job.days = [];
                    }
                    job.days[day] = parseInt($scope.job.days[day].value);
                }
            }

            job.uiDefined = true;

            function success() {
                $state.go('scheduler');
                LoadingModal.close();
            }

            function failure(response) {
                MotechAlert(i18nService.getMessage(response.data.key, response.data.params), "scheduler.error");
                LoadingModal.close();
            }

            if (action === 'new') {
                LoadingModal.open();
                JobsService.createJob(job, success, failure);
            } else if (action === 'edit'){
                ModalFactory.showConfirm("scheduler.confirm.updateJob", "scheduler.confirm", function(response) {
                    if (response) {
                        LoadingModal.open();
                        JobsService.updateJob(job, success, failure);
                    }
                });
            }
        };

        $scope.typeChanged = function() {
            var job = {};
            LoadingModal.open();
            job['@jobType'] = $scope.job['@jobType'];
            job.motechEvent = $scope.job.motechEvent;
            job.startDate = $scope.job.startDate;
            $scope.job = job;
            LoadingModal.close();
        };

        $scope.parseDateToString = function(milliseconds) {
            return moment(milliseconds).format("YYYY-MM-DD HH:mm:ss");
        };

        if ($scope.action === 'edit') {
            JobsService.getCurrentJob(function(data) {
                var job = data;
                if (job.startDate) {
                    $scope.dates.startDate = $scope.parseDateToString(job.startDate);
                }

                if (job.endDate) {
                    $scope.dates.endDate = $scope.parseDateToString(job.endDate);
                }

                if (job.days) {
                    var days = {
                    'Monday': '0',
                    'Tuesday': '1',
                    'Wednesday': '2',
                    'Thursday': '3',
                    'Friday': '4',
                    'Saturday': '5',
                    'Sunday': '6'
                    };

                    for (var i = 0; i < job.days.length; i += 1) {
                        job.days[i] = $scope.days[days[job.days[i]]];
                    }
                }

                if (job.time) {
                    var time = job.time,
                        hour = time.hour < 10 ? "0" + time.hour : time.hour,
                        minute = time.minute < 10 ? "0" + time.minute : time.minute;
                    job.time = hour + ":" + minute;
                }

                for (var key in data.motechEvent.parameters) {
                    $scope.motechEventParameters = data.motechEvent.parameters;
                }

                $scope.job = job;
            });
        }

        LoadingModal.close();
    }

}());