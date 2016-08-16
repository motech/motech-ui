(function(){
	'use strict';

	angular.module('motech-admin')
		.controller('BundleSettingsController', controller);

	controller.$inject = ['$scope', '$stateParams', '$http', 'BundleSettingsFactory', 'LoadingModal', 'ModalFactory', 'BundlesFactory', 'ServerService'];
	function controller($scope, $stateParams, $http, BundleSettingsFactory, LoadingModal, ModalFactory, BundlesFactory, ServerService){

        var restartBundleHandler = function () {
            $scope.module.restart();
            ModalFactory.showSuccessAlert('admin.settings.saved');
        };

        $scope.module = BundlesFactory.get({ bundleId:$stateParams.bundleId });

        $scope.moduleSettings = BundleSettingsFactory.query({ bundleId:$stateParams.bundleId });

        $http({method:'GET', url:ServerService.formatURL('/module/admin/api/settings/' + $stateParams.bundleId + '/raw')}).
            success(function (data) {
                $scope.rawFiles = data;
            });

        $scope.saveSettings = function (mSettings, doRestart) {
            var successHandler;
            if (doRestart === true) {
                successHandler = restartBundleHandler;
            } else {
                successHandler = function () {
                    LoadingModal.close();
                    ModalFactory.showSuccessAlert('admin.settings.saved');
                };
            }

            LoadingModal.open();

            mSettings.$save({bundleId:$scope.module.bundleId}, successHandler,
                function(response) {
                    LoadingModal.close();
                    ModalFactory.showErrorAlertWithResponse('admin.settings.error', 'admin.error', response);
                }
            );
        };

        $scope.uploadRaw = function (filename, doRestart) {
            var successHandler,
                file = $scope.fileValue,
                fd = new FormData();

            if (doRestart === true) {
                successHandler = restartBundleHandler;
            } else {
                successHandler = function () {
                    LoadingModal.close();
                    ModalFactory.showSuccessAlert('admin.settings.saved');
                };
            }

            LoadingModal.open();

            fd.append('file', file);
            fd.append('filename', filename);

            $http.post(ServerService.formatURL('/module/admin/api/settings/' + $stateParams.bundleId + '/raw'), fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(successHandler)
            .error(function (response) {
                LoadingModal.close();
                ModalFactory.showErrorAlert('admin.settings.error', 'admin.error');
            });
        };
	}

})();
