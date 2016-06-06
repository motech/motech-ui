(function () {
    'use strict';

    angular.module('motech-admin')
        .factory('BundlesFactory', BundlesFactory);

    BundlesFactory.$inject = ['$rootScope', '$resource','ServerService', 'i18nService', 'MotechConfirm', 'ModalWindow', 'LoadingModal'];
    function BundlesFactory ($rootScope, $resource, ServerService, i18nService, MotechConfirm, ModalWindow, LoadingModal) {
        var Bundle = $resource(
            ServerService.formatURL('/module/admin/api/bundles/:bundleId/:action'),
            {bundleId:'@bundleId'},
            {
                start: {method:'POST', params: {action: 'start'}},
                stop: {method:'POST', params: {action: 'stop'}},
                restart: {method:'POST', params: {action: 'restart'}},
                uninstall: {method: 'POST', params: {action: 'uninstall'}},
                uninstallWithConfig: {method: 'POST', params: {action: 'uninstallconfig'}},
                details: {method: 'GET', params: {action: 'detail'}}
            }
        );

        Bundle.prototype.getVersion = function(){
            return this.version.major+"."+this.version.minor+"."+this.version.micro+"-"+this.version.qualifier;
        };
        Bundle.prototype.getIconURL = function(){
            return ServerService.formatURL("module/server/module/icon?bundleId=" + this.bundleId);
        };
        Bundle.prototype.isActive = function(){
            return this.state === "ACTIVE";
        };


        function callbackSuccess(){
            LoadingModal.close();
            $rootScope.$broadcast('motech.refresh');
        }

        Bundle.prototype.start = function(){
            LoadingModal.open();
            this.$start(callbackSuccess);
        };
        Bundle.prototype.stop = function(){
            MotechConfirm(i18nService.getMessage('admin.bundles.stateChangeWarning')) //'admin.bundles.stop' (stop button text)
            .then(function(){
                LoadingModal.open();
                this.$stop(callbackSuccess);
            });
        };
        Bundle.prototype.restart = function(){
            LoadingModal.open();
            this.$restart(callbackSuccess);
        };
        
        Bundle.prototype.uninstallBundle = function(){
            MotechConfirm(i18nService.getMessage('admin.bundles.stateChangeWarning')) // 'admin.remove' (remove button text)
            .then(uninstallBundleConfigModal);
        };
        Bundle.prototype.uninstallConfig = function(){
            MotechConfirm(i18nService.getMessage('admin.bundles.remove.config')) // 'admin.remove.config' (remove with config button text)
            .then(function(){
                LoadingModal.open();
                this.$uninstallWithConfig(callbackSuccess);
            }).catch(function(){
                LoadingModal.open();
                this.$uninstall(callbackSuccess);
            });
        };

        return Bundle;
    }

})();