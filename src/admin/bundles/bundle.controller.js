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

        function callbackSuccss(){
            LoadingModal.close();
            $rootScope.$broadcast('motech.refresh');
        }

        function startBundle(){
            LoadingModal.open();
            bundle.$start(callbackSuccss);
        }
        function stopBundleModal(){
            MotechConfirm(i18nService.getMessage('admin.confirm'))
            .then(function(){
                LoadingModal.open();
                bundle.$stop(callbackSuccss);
            });
        }
        function restartBundle(){
            LoadingModal.open();
            bundle.$restart(callbackSuccss);
        }
        
        function uninstallBundleModal(){
            MotechConfirm(i18nService.getMessage('admin.confirm'))
            .then(uninstallBundleConfigModal);
        }
        function uninstallBundleConfigModal(){
            MotechConfirm(i18nService.getMessage('admin.confirm'))
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