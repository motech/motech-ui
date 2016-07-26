(function () {
    'use strict';

    angular.module('motech-admin')
        .controller('BundlesListController', bundlesListController);

    bundlesListController.$inject = ['$scope', '$rootScope', '$state', '$http', 'BundlesFactory', 'LoadingModal', 'ServerService'];
    function bundlesListController ($scope, $rootScope, $state, $http, BundlesFactory, LoadingModal, ServerService) {

        BundlesFactory.query(function(bundles){
            $scope.bundles = bundles;
        });

        $scope.bundlesWithSettings = [];

        $http({method:'GET', url:ServerService.formatURL('/module/admin/api/settings/bundles/list')}).
            success(function (data) {
                $scope.bundlesWithSettings = data;
            });

        $scope.showSettings = function (bundle) {
            return $.inArray(bundle.symbolicName, $scope.bundlesWithSettings) >= 0 ||
                    (bundle.settingsURL && bundle.settingsURL.length !== 0);
        };

        $scope.loadBundleSettingsPage = function loadBundleSettingsPage(bundle) {
            if (bundle.settingsURL !== null && bundle.isActive()) {
                $scope.goToSettingsURL(bundle.angularModule, bundle.settingsURL);
            } else if (bundle.bundleId !== undefined) {
                $state.go('bundles.bundleSettings', {'bundleId': bundle.bundleId});
            } else {
                $state.go('platformSettings');
            }
        };

        $scope.goToSettingsURL = function (moduleName, url) {
            var convertUrl = function (urlParam) {
                if(urlParam.indexOf('/') === 0) {urlParam = urlParam.replace('/', '');}
                if(urlParam.indexOf('/') > 0) {urlParam = urlParam.replace('/', '.');}
                if(urlParam.indexOf('/') > 0) {urlParam = urlParam.replace(/(\/)\w+((\/)\w*)*/i, '');}
                return urlParam;
            };

            if (moduleName) {
                LoadingModal.open();

                $http.get('../server/module/critical/' + moduleName).success(function (response) {
                    if (response.data !== undefined && response.data !== '' && response.status !== 408) {
                        ModalFactory.showErrorAlert(null, null, response.status + ": " + response.statusText);
                        LoadingModal.close();
                    }
                });
                if (url.indexOf('admin/bundleSettings/') > 0) {
                    $state.go('admin.bundleSettings', {'bundleId': url.substring(url.lastIndexOf("/")+1)});
                } else {
                    $state.go(convertUrl(url), $state.params);
                }
                LoadingModal.close();
            }
        };
    }

})();