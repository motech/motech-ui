(function () {
    'use strict';

    angular.module('motech-admin')
        .controller('SettingsController', settingsController);

    settingsController.$inject = ['$scope', 'PlatformSettingsFactory', 'i18nService', '$http', 'ModalFactory', 'LoadingModal', 'ServerService'];
    function settingsController ($scope, PlatformSettingsFactory, i18nService, $http, ModalFactory, LoadingModal, ServerService) {
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
                    ModalFactory.showSuccessAlert('admin.settings.saved');
                })
                .error( function() {
                    LoadingModal.close();
                    ModalFactory.showErrorAlert('admin.settings.error.location');
                });
        };

        $scope.saveNewSettings = function () {
            LoadingModal.open();
            var newSettings = {};
            var settings = [];

            newSettings.section = "noSettings";

            for (var i in $scope.newSettings) {
                settings.push({key: 'new.db.' + i, value: $scope.newSettings[i]});
            }

            newSettings.settings = settings;

            $http.post(ServerService.formatURL('module/admin/api/settings/platform'), newSettings)
                .success( function () {
                    LoadingModal.close();
                    ModalFactory.showSuccessAlert('admin.settings.saved');
                })
                .error( function () {
                    LoadingModal.close();
                    ModalFactory.showErrorAlert('admin.settings.error.location');
                });
        };

        $scope.uploadSettings = function () {
            LoadingModal.open();
            var file = $scope.settingsFile;
            var fd = new FormData();

            fd.append('file', file);

            $http.post(ServerService.formatURL('module/admin/api/settings/platform/upload'), fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function () {
                LoadingModal.close();
                ModalFactory.showSuccessAlert('admin.settings.saved');
                $scope.platformSettings = PlatformSettingsFactory.get();
            })
            .error(function () {
                LoadingModal.close();
                ModalFactory.showErrorAlert('admin.settings.error');
            });
        };

        $scope.uploadFileLocation = function () {
            $http({method:'POST', url: ServerService.formatURL('module/admin/api/settings/platform/location'), params: {location: this.location}})
                .success( function () {
                    LoadingModal.close();
                    ModalFactory.showSuccessAlert('admin.settings.saved');
                })
                .error( function () {
                   LoadingModal.close();
                   ModalFactory.showErrorAlert('admin.settings.error.location');
                });
        };

        $scope.exportConfig = function () {
            $http.get(ServerService.formatURL('module/admin/api/settings/platform/export'))
            .success(function () {
                window.location.replace(ServerService.formatURL("module/admin/api/settings/platform/export"));
            })
            .error( function () {
                LoadingModal.close();
                ModalFactory.showErrorAlert('admin.settings.error.export');
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