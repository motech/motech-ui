(function(){
    'use-strict';

    angular.module('motech-admin')
        .directive('installModules', moduleInstall);

    moduleInstall.$inject = ['ServerService'];
    function moduleInstall(ServerService) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/admin/bundles/install-modules.html',
            controller: controller,
            link: function(scope, element, attrs) {
                var url = $("#bundleUploadForm").attr("action");
                url = ServerService.formatURL(url);
                $("#bundleUploadForm").attr("action", url);
            }
        };
    }

    controller.$inject = ['$scope', '$rootScope', '$state', 'BundlesFactory', 'LoadingModal', 'ModalFactory'];
    function controller($scope, $rootScope, $state, BundlesFactory, LoadingModal, ModalFactory) {
        $scope.moduleSources = [
            'Repository',
            'File'
        ];

        $scope.moduleSource = $scope.moduleSources[0];

        $scope.mavenStr = function(artifactId) {
            return 'org.motechproject:'.concat(artifactId).concat(':').concat($scope.msg('server.version'));
        };

        $scope.modules = {};
        $scope.modules[$scope.mavenStr('alerts')] = 'Alerts';
        $scope.modules[$scope.mavenStr('appointments')] = 'Appointments';
        $scope.modules[$scope.mavenStr('atom-client')] = 'Atom Client';
        $scope.modules[$scope.mavenStr('csd')] = 'Care Services Directory';
        $scope.modules[$scope.mavenStr('cms-lite')] = 'CMS Lite';
        $scope.modules[$scope.mavenStr('commcare')] = 'Commcare';
        $scope.modules[$scope.mavenStr('dhis2')] = 'DHIS2';
        $scope.modules[$scope.mavenStr('event-logging')] = 'Event Logging';
        $scope.modules[$scope.mavenStr('http-agent')] = 'Http Agent';
        $scope.modules[$scope.mavenStr('ihe-interop')] = 'IHE Interop';
        $scope.modules[$scope.mavenStr('ivr')] = 'IVR';
        $scope.modules[$scope.mavenStr('message-campaign')] = 'Message Campaign';
        $scope.modules[$scope.mavenStr('metrics')] = 'Metrics';
        $scope.modules[$scope.mavenStr('mtraining')] = 'mTraining';
        $scope.modules[$scope.mavenStr('motech-tasks')] = 'Tasks';
        $scope.modules[$scope.mavenStr('odk')] = 'Open Data Kit';
        $scope.modules[$scope.mavenStr('openmrs')] = 'OpenMRS';
        $scope.modules[$scope.mavenStr('pill-reminder')] = 'Pill Reminder';
        $scope.modules[$scope.mavenStr('motech-scheduler')] = 'Scheduler';
        $scope.modules[$scope.mavenStr('schedule-tracking')] = 'Schedule Tracking';
        $scope.modules[$scope.mavenStr('sms')] = 'SMS';

        $scope.module = "";

        $scope.startOnUpload = function () {
            if ($scope.startUpload !== true) {
                $scope.startUpload = true;
                $('.start-on-upload').find('i').removeClass("fa-square-o").addClass('fa-check-square-o');
            } else {
                $scope.startUpload = false;
                $('.start-on-upload').find('i').removeClass("fa-check-square-o").addClass('fa-square-o');
            }
        };

        $scope.submitBundle = function () {
            if (!$scope.isNoModuleOrFileSelected()) {
                LoadingModal.open();
                $('#bundleUploadForm').ajaxSubmit({
                    success: function (data, textStatus, jqXHR) {
                        if (jqXHR.status === 0 && data) {
                            ModalFactory.showErrorWithStackTrace('admin.error', 'admin.bundles.error.start', data);
                            LoadingModal.close();
                        } else {
                            $scope.bundles = BundlesFactory.query(function () {
                                if ($scope.startUpload) {
                                    $timeout(function () {
                                        $scope.$emit('lang.refresh');
                                        $scope.refreshModuleList();
                                        LoadingModal.close();
                                    }, MODULE_LIST_REFRESH_TIMEOUT);
                                } else {
                                    $state.reload();
                                    LoadingModal.close();
                                }
                                $scope.module = "";
                                $('#bundleUploadForm .fileinput').fileinput('clear');
                                ModalFactory.showSuccessAlert('admin.bundles.successInstall', 'admin.bundles.installNewModule');
                            });
                        }
                    },
                    error:function (response) {
                        ModalFactory.showErrorWithStackTrace('admin.error', 'admin.bundles.error.start', response);
                        LoadingModal.close();
                    }
                });
            } else if ($scope.moduleSource === 'Repository') {
                ModalFactory.showErrorAlert('admin.bundles.error.moduleNotSelected', 'admin.error');
            } else {
                ModalFactory.showErrorAlert('admin.bundles.error.fileNotSelected', 'admin.error');
            }
        };

        $scope.isNoModuleOrFileSelected = function () {
            if ($scope.moduleSource === 'Repository') {
                return !$scope.module;
            } else if ($scope.moduleSource === 'File') {
                if ($("#bundleUploadForm #fileInput").val() === '') {
                    return true;
                } else {
                    return false;
                }
            }
        };

        $scope.refreshModuleList = function () {
            $scope.$emit('module.list.refresh');
        };
    }
})();
