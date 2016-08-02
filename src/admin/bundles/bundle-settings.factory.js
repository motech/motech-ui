(function () {
    'use strict';

    angular.module('motech-admin')
        .factory('BundleSettingsFactory', BundleSettingsFactory);

    BundleSettingsFactory.$inject = ['$rootScope', '$resource','ServerService'];
    function BundleSettingsFactory ($rootScope, $resource, ServerService) {
        var BundleSettings = $resource(
            ServerService.formatURL('/module/admin/api/settings/:bundleId')
        );

        return BundleSettings;
    }

})();