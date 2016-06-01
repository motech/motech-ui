(function () {

    'use strict';

    angular.module('motech-scheduler')
            .controller('CreateOrUpdateJobController', createOrUpdateJobController);

    createOrUpdateJobController.$inject = ['$scope', '$timeout', '$stateParams', 'JobsService', 'ModalFactory', 'LoadingModal', 'i18nService'];
    function createOrUpdateJobController ($scope, $timeout, $stateParams, JobsService, ModalFactory, LoadingModal, i18nService) {

        /*
        innerLayout({}, {
            show: false,
            button: '#scheduler-filters'
        });
        */

        $scope.job = {};
        $scope.job.motechEvent = {};
        $scope.motechEventParameters = [];
        $scope.action = $stateParams.action;
        $scope.dates = {};

        $scope.jobTypes = [
            { displayName: "Cron", name: "CRON" }, { displayName: "Repeating", name: "REPEATING" },
            { displayName: "Repeating Period", name: "REPEATING_PERIOD"}, { displayName: "Run Once", name: "RUN_ONCE" },
            { displayName: "Day of Week", name: "DAY_OF_WEEK" }
        ];

        function containsKey(map, key) {
            var result = false;
            angular.forEach($scope.motechEventParameters, function(element) {
                if (element.key === key) {
                    result = true;
                }
            });
            return result;
        }

        $scope.addToMap = function(key, value) {
            if (containsKey($scope.motechEventParameters, key)) {
                ModalFactory.showAlert("scheduler.keyAlreadyExists", "schedulerKeyAlreadyExists");
            } else {
                $scope.motechEventParameters.push({
                    "key": key,
                    "value": value
                });
            }
            $timeout(function() {
                $scope.key = "";
                $scope.value = "";
            });

        };

        $scope.resetMap = function() {
            ModalFactory.showConfirm("scheduler.confirm.resetMap", "scheduler.confirm", function(response) {
                if (response) {
                    $timeout(function() {
                        $scope.motechEventParameters = [];
                    });
                }
            });
        };

        $scope.removeFromMap = function(key) {
            ModalFactory.showConfirm("scheduler.confirm.removeItem", "scheduler.confirm", function(response) {
                if (response) {
                    var id;
                    for (var i = 0; i < $scope.motechEventParameters.length; i += 1) {
                        if ($scope.motechEventParameters[i].key === key) {
                            id = i;
                        }
                    }
                    if (id > -1) {
                        $timeout(function () {
                            $scope.motechEventParameters.splice(id, 1);
                        });
                    }
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
                    ModalFactory.showAlert({
                        title: $scope.msg("scheduler.error"),
                        message: jQuery.i18n.prop.apply(null, ["scheduler.error.endDateBeforeStartDate"].concat([$scope.dates.startDate, $scope.dates.endDate]))
                    });
                    return;
                }
            }

            if ($scope.job.days) {
                for (var day = 0; day < $scope.job.days.length; day += 1) {
                    if (day === 0) {
                        job.days = [];
                    }
                    job.days[day] = parseInt($scope.job.days[day]);
                }
            }

            job.uiDefined = true;

            function success() {
                window.location.href="#/scheduler/dashboard";
                LoadingModal.close();
            }

            function failure(response) {
                ModalFactory.showAlert({
                    title: $scope.msg("scheduler.error"),
                    message: jQuery.i18n.prop.apply(null, [response.data.key].concat(response.data.params))
                });
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

                    var days = {};

                    days["Monday"] = "0";
                    days["Tuesday"] = "1";
                    days["Wednesday"] = "2";
                    days["Thursday"] = "3";
                    days["Friday"] = "4";
                    days["Saturday"] = "5";
                    days["Sunday"] = "6";

                    for (var i = 0; i < job.days.length; i += 1) {
                        job.days[i] = days[job.days[i]];
                    }
                }

                if (job.time) {
                    var time = job.time,
                        hour = time.hour < 10 ? "0" + time.hour : time.hour,
                        minute = time.minute < 10 ? "0" + time.minute : time.minute;
                    job.time = hour + ":" + minute;
                }

                for (var key in data.motechEvent.parameters) {
                    $scope.addToMap(key, data.motechEvent.parameters[key]);
                }

                $scope.job = job;
            });
        }

        LoadingModal.close();
    }

}());