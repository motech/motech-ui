(function(){
	'use strict';

	angular.module('motech-admin')
		.controller('BundleSettingsController', controller);

	controller.$inject = ['$scope', '$stateParams', '$http', 'BundleSettingsFactory', 'BundleRawSettingsFactory', 'LoadingModal', 'ModalFactory', 'BundlesFactory'];
	function controller($scope, $stateParams, $http, BundleSettingsFactory, BundleRawSettingsFactory, LoadingModal, ModalFactory, BundlesFactory){

        var restartBundleHandler = function () {
            $scope.module.restart();
            ModalFactory.showSuccessAlert('admin.settings.saved');
        };

        $scope.module = BundlesFactory.get({ bundleId:$stateParams.bundleId });

        $scope.moduleSettings = BundleSettingsFactory.query({ bundleId:$stateParams.bundleId });

        $scope.rawFiles = BundleRawSettingsFactory.query({ bundleId:$stateParams.bundleId });

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

        $scope.uploadRaw = function (rawSettings, doRestart) {
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

            rawSettings.$save({bundleId:$scope.module.bundleId}, successHandler,
                function(response) {
                    LoadingModal.close();
                    ModalFactory.showErrorAlertWithResponse('admin.settings.error', 'admin.error', response);
                }
            );
        };
	}

})();