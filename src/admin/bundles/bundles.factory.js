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

        Bundle.prototype.isInstalled = function () {
            return this.state === 'INSTALLED';
        };

        Bundle.prototype.isResolved = function () {
            return this.state === 'RESOLVED';
        };

        function callbackSuccess(){
            LoadingModal.close();
            $rootScope.$broadcast('motech.refresh');
        }

        Bundle.prototype.start = function(){
            var bundle = this;
            MotechConfirm(i18nService.getMessage('admin.bundles.stateChangeWarning')) //'admin.bundles.start' (start button text)
            .then(function(){
                LoadingModal.open();
                bundle.$start(callbackSuccess);
            });
        };
        Bundle.prototype.stop = function(){
            var bundle = this;
            MotechConfirm(i18nService.getMessage('admin.bundles.stateChangeWarning')) //'admin.bundles.stop' (stop button text)
            .then(function(){
                LoadingModal.open();
                bundle.$stop(callbackSuccess);
            });
        };
        Bundle.prototype.restart = function(){
            LoadingModal.open();
            this.$restart(callbackSuccess);
        };
        
        Bundle.prototype.uninstall = function(){
            var bundle = this;
            MotechConfirm(i18nService.getMessage('admin.bundles.stateChangeWarning')) // 'admin.remove' (remove button text)
            .then(function(){
                bundle.uninstallWithConfig();
            });
        };
        Bundle.prototype.uninstallWithConfig = function(){
            var bundle = this;
            MotechConfirm(i18nService.getMessage('admin.bundles.remove.config')) // 'admin.remove.config' (remove with config button text)
            .then(function(){
                LoadingModal.open();
                bundle.$uninstallWithConfig(callbackSuccess);
            }).catch(function(){
                LoadingModal.open();
                bundle.$uninstall(callbackSuccess);
            });
        };



        return Bundle;
    }

})();