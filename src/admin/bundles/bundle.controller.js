(function () {
    'use strict';

    angular.module('motech-admin')
        .controller('BundleController', bundleController);

    bundleController.$inject = ['$scope', '$rootScope', 'i18nService', 'MotechConfirm', 'ModalWindow', 'LoadingModal', 'ServerService'];
    function bundleController ($scope, $rootScope, i18nService, MotechConfirm, ModalWindow, LoadingModal, ServerService) {
        var bundle = $scope.bundle;

        $scope.active = isActive();
        $scope.imgSrc = getImgSrc();

        this.start = startBundle;
        this.stop = stopBundleModal;
        this.restart = restartBundle;
        this.uninstall = uninstallBundleModal;
        this.getImgSrc = getImgSrc;
        this.isActive = isActive;

        this.showDetails = showDetails;

        function isActive(){
            return bundle.state === "ACTIVE";
        }

        function getImgSrc(){
            return ServerService.formatURL("module/server/module/icon?bundleId=" + $scope.bundle.bundleId);
        }

        function callbackSuccess(){
            LoadingModal.close();
            $rootScope.$broadcast('motech.refresh');
        }

        function startBundle(){
            LoadingModal.open();
            bundle.$start(callbackSuccss);
        }
        function stopBundleModal(){
            MotechConfirm(i18nService.getMessage('admin.bundles.stateChangeWarning')) //'admin.bundles.stop' (stop button text)
            .then(function(){
                LoadingModal.open();
                bundle.$stop(callbackSuccess);
            });
        }
        function restartBundle(){
            LoadingModal.open();
            bundle.$restart(callbackSuccess);
        }
        
        function uninstallBundleModal(){
            MotechConfirm(i18nService.getMessage('admin.bundles.stateChangeWarning')) // 'admin.remove' (remove button text)
            .then(uninstallBundleConfigModal);
        }
        function uninstallBundleConfigModal(){
            MotechConfirm(i18nService.getMessage('admin.bundles.remove.config')) // 'admin.remove.config' (remove with config button text)
            .then(function(){
                LoadingModal.open();
                bundle.$uninstallWithConfig(callbackSuccess);
            }).catch(function(){
                LoadingModal.open();
                bundle.$uninstall(callbackSuccess);
            });
        }

        function showDetails(){
            bundle.$details(function(data){
                ModalWindow(angular.toJson(data), bundle.name)
                .open();
            });
        }

    }

})();