(function () {
    'use strict';

    angular.module('motech-admin')
        .controller('SettingsController', settingsController);

    settingsController.$inject = ['$scope', 'PlatformSettingsFactory', 'i18nService', '$http', 'ModalWindow', 'LoadingModal', 'ServerService'];
    function settingsController ($scope, PlatformSettingsFactory, i18nService, $http, ModalWindow, LoadingModal, ServerService) {
        $scope.comboboxValues = { "security.password.validator" : ["none", "lower_upper", "lower_upper_digit", "lower_upper_digit_special"],
                                          "system.language" : ["en", "pl"] };
        $scope.platformSettings = PlatformSettingsFactory.get();

        $scope.label = function (key) {
            return i18nService.getMessage('admin.settings.' + key);
        };

        $scope.saveSettings = function (settings) {
            LoadingModal.open();
            $http.post(ServerService.formatURL('module/admin/api/settings/platform'), settings)
                .success( function() {
                    LoadingModal.close();
                    ModalWindow(angular.toJson(i18nService.getMessage('admin.settings.saved')),
                        i18nService.getMessage('admin.success')).open();
                })
                .error( function() {
                    LoadingModal.close();
                    ModalWindow(angular.toJson(i18nService.getMessage('admin.settings.error.location')),
                        i18nService.getMessage('admin.settings.error')).open();
                });
        };

        $scope.saveNewSettings = function () {
            LoadingModal.open();
            $('#noSettingsForm').ajaxSubmit({
                success: function () {
                    LoadingModal.close();
                    ModalWindow(angular.toJson(i18nService.getMessage('admin.settings.saved')),
                        i18nService.getMessage('admin.success')).open();
                    $scope.platformSettings = PlatformSettingsFactory.get();
                },
                error: function (response) {
                    LoadingModal.close();
                    ModalWindow(angular.toJson(response.status + ": " + response.statusText),
                        i18nService.getMessage('admin.settings.error')).open();
                }
            });
        };

        $scope.uploadSettings = function () {
            $("#settingsFileForm").ajaxSubmit({
                success: function () {
                    LoadingModal.close();
                    ModalWindow(angular.toJson(i18nService.getMessage('admin.settings.saved')),
                        i18nService.getMessage('admin.success')).open();
                    $scope.platformSettings = PlatformSettingsFactory.get();
                },
                error: function (response) {
                    LoadingModal.close();
                    ModalWindow(angular.toJson(response.status + ": " + response.statusText),
                        i18nService.getMessage('admin.settings.error')).open();
                }
            });
        };

        $scope.uploadFileLocation = function () {
            $http({method:'POST', url: ServerService.formatURL('module/admin/api/settings/platform/location'), params: {location: this.location}})
                .success( function () {
                    LoadingModal.close();
                    ModalWindow(angular.toJson(i18nService.getMessage('admin.settings.saved')), i18nService.getMessage('admin.success')).open();
                })
                .error( function () {
                   LoadingModal.close();
                   ModalWindow(angular.toJson(i18nService.getMessage('admin.settings.error.location')),
                       i18nService.getMessage('admin.settings.error')).open();
                });
        };

        $scope.saveAll = function () {
            LoadingModal.open();
            $http.post(ServerService.formatURL('module/admin/api/settings/platform/list'), $scope.platformSettings.settingsList)
                .success( function () {
                    LoadingModal.close();
                    ModalWindow(angular.toJson(i18nService.getMessage('admin.settings.saved')), i18nService.getMessage('admin.success')).open();
                })
                .error( function () {
                    LoadingModal.close();
                    ModalWindow(angular.toJson(i18nService.getMessage('admin.settings.error.location')),
                        i18nService.getMessage('admin.settings.error')).open();
                });
        };

        $scope.exportConfig = function () {
            $http.get(ServerService.formatURL('module/admin/api/settings/platform/export'))
            .success(function () {
                window.location.replace(ServerService.formatURL("module/admin/api/settings/platform/export"));
            })
            .error( function () {
                LoadingModal.close();
                ModalWindow(angular.toJson(i18nService.getMessage('admin.settings.error.export')),
                    i18nService.getMessage('admin.settings.error')).open();
            });
        };

        $scope.addValue = function(key, value) {
            if ($scope.comboboxValues[key].indexOf(value) === -1) {
                $scope.comboboxValues[key].push(value);
            }
        };

        $scope.isTextOrNumber = function(option) {
            return (typeof option.value === "string" || typeof option.value === "number" || option.value === null) && !$scope.isCombobox(option);
        };

        $scope.isBool = function(option) {
            return typeof option.value === "boolean";
        };

        $scope.isCombobox = function(option) {
            return $scope.getComboboxValues(option.key) !== undefined;
        };

        $scope.getComboboxValues = function(key) {
            return $scope.comboboxValues[key];
        };
    }

})();