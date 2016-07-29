(function () {
    'use strict';

    angular.module('motech-admin')
        .factory('BundleRawSettingsFactory', BundleRawSettingsFactory);

    BundleRawSettingsFactory.$inject = ['$rootScope', '$resource','ServerService'];
    function BundleRawSettingsFactory ($rootScope, $resource, ServerService) {
        var BundleRawSettings = $resource(
            ServerService.formatURL('/module/admin/api/settings/:bundleId/raw')
        );

        return BundleRawSettings;
    }

})();