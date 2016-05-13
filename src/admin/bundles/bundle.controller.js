(function () {
    'use strict';

    angular.module('motech-admin')
        .controller('BundleController', bundleController);

    bundleController.$inject = ['$scope', '$rootScope', 'BootstrapDialog', 'LoadingModal', 'ServerService'];
    function bundleController ($scope, $rootScope, BootstrapDialog, LoadingModal, ServerService) {
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
            BootstrapDialog.show({
            message: 'admin.confirm',
            buttons: [{
                label: 'admin.bundles.stop',
                cssClass: 'btn-primary',
                action: function(dialogRef){
                    dialogRef.close();
                    LoadingModal.open();
                    bundle.$stop(callbackSuccss);
                }
            }, {
                label: 'admin.cancel',
                action: function(dialogRef){
                    dialogRef.close();
                }
            }]});
        }
        function restartBundle(){
            LoadingModal.open();
            bundle.$restart(callbackSuccss);
        }
        function uninstallBundleModal(){
            BootstrapDialog.show({
                message: 'admin.confirm',
                buttons: [{
                    label: 'admin.bundles.stop',
                    cssClass: 'btn-primary',
                    action: function(dialogRef) {
                        dialogRef.close();
                        uninstallBundleConfigModal();
                    }
                }, {
                    label: 'admin.cancel',
                    action: function(dialogRef){
                        dialogRef.close();
                    }
                }]
            });
        }
        function uninstallBundleConfigModal(){
            BootstrapDialog.show({
                message: 'admin.confirm',
                buttons: [{
                    label: 'admin.bundles.stop',
                    cssClass: 'btn-primary',
                    action: function(dialogRef) {
                        dialogRef.close();
                        LoadingModal.open();
                        bundle.$uninstallWithConfig(callbackSuccess);
                    }
                }, {
                    label: 'admin.bundles.stop',
                    action: function(dialogRef) {
                        dialogRef.close();
                        LoadingModal.open();
                        bundle.$uninstall(callbackSuccess);
                    }    
                }]
            });
        }

        function showDetails(){
            bundle.$details(function(data){
                BootstrapDialog.show({
                    title: bundle.name,
                    message: angular.toJson(data)
                });
            });
        }

    }

})();