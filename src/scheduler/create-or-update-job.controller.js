(function () {

    'use strict';

    angular.module('motech-scheduler')
            .controller('CreateOrUpdateJobController', createOrUpdateJobController);

    createOrUpdateJobController.$inject = ['$scope', '$timeout', '$state', '$stateParams', 'JobsService', 'ModalFactory', 'LoadingModal', 'i18nService', 'MotechAlert'];
    function createOrUpdateJobController ($scope, $timeout, $state, $stateParams, JobsService, ModalFactory, LoadingModal, i18nService, MotechAlert) {

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

            angular.forEach($scope.motechEventParameters, function(parameter) {
                job.motechEvent.parameters[parameter.key] = parameter.value;
            });

            if ($scope.dates.startDate && $scope.dates.endDate) {
                if ($scope.dates.startDate >= $scope.dates.endDate) {
                    //ModalFactory.showAlert({
                    //   title: $scope.msg("scheduler.error"),
                    //    message: jQuery.i18n.prop.apply(null, ["scheduler.error.endDateBeforeStartDate"].concat([$scope.dates.startDate, $scope.dates.endDate]))
                    //});
                    MotechAlert("End date must be after start date.", "scheduler.error");
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
                //ModalFactory.showAlert({
                //    title: $scope.msg("scheduler.error"),
                //    message: jQuery.i18n.prop.apply(null, [response.data.key].concat(response.data.params))
                //});
                MotechAlert(response.data.params+"{{'"+response.data.key+"' | translate}}", "scheduler.error");
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