(function () {
    'use-strict';

    angular.module('motech-admin')
        .directive('installModules', moduleInstall);

    moduleInstall.$inject = ['ServerService'];
    function moduleInstall(ServerService) {
        return {
            restrict: 'E',
            templateUrl: '/admin/bundles/install-modules.html',
            controller: controller,
            link: function (scope) {
                scope.startOnUpload = function () {
                    if (scope.startUpload !== true) {
                        scope.startUpload = true;
                        $('.start-on-upload').find('i').removeClass("fa-square-o").addClass('fa-check-square-o');
                    } else {
                        scope.startUpload = false;
                        $('.start-on-upload').find('i').removeClass("fa-check-square-o").addClass('fa-square-o');
                    }
                };
            }
        };
    }

    controller.$inject = ['$scope', '$rootScope', '$timeout', '$state', 'BundlesFactory', 'LoadingModal', 'ModalFactory', 'ModalWindow', 'ServerService'];
    function controller($scope, $rootScope, $timeout, $state, BundlesFactory, LoadingModal, ModalFactory, ModalWindow, ServerService) {
        $scope.moduleSources = [
            'Repository',
            'File'
        ];
        $scope.startUpload = true;
        $scope.moduleSource = $scope.moduleSources[0];
        var MODULE_LIST_REFRESH_TIMEOUT = 6000;

        $scope.mavenStr = function (artifactId) {
            return 'org.motechproject:'.concat(artifactId).concat(':').concat($rootScope.msg('server.version'));
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

        $scope.submitBundle = function () {
            $("#bundleUploadForm").submit(function(event){
                if (!$scope.isNoModuleOrFileSelected()) {
                    LoadingModal.open();

                    var formData = {
                            moduleSource: $scope.moduleSource,
                            moduleId: $scope.module,
                            file: $('#bundleUploadForm input[name=file]').val(),
                            startBundle: $scope.startBundle
                        },
                        url = "/module/admin/api/bundles/upload";

                    url = ServerService.formatURL(url);

                    $.ajax({
                        type: 'POST',
                        data: formData,
                        url: url
                    }).done(function (data, status, xhr) {
                        if (xhr.status === 0 && data) {
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
                        $scope.hideInstallModulesModal();
                    })
                        .fail(function (response) {
                            ModalFactory.showErrorWithStackTrace('admin.error', 'admin.bundles.error.start', response);
                            LoadingModal.close();
                            $scope.hideInstallModulesModal();
                        });
                } else if ($scope.moduleSource === 'Repository') {
                    ModalFactory.showErrorAlert('admin.bundles.error.moduleNotSelected', 'admin.error');
                } else {
                    ModalFactory.showErrorAlert('admin.bundles.error.fileNotSelected', 'admin.error');
                }
                $scope.hideInstallModulesModal();
                event.preventDefault();
            });
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
