(function(){
    'use strict';

    angular.module('motech-admin')
        .factory('PlatformSettingsFactory', PlatformSettingsFactory);

    PlatformSettingsFactory.$inject = ['$resource', 'ServerService'];
    function PlatformSettingsFactory ($resource, ServerService) {
        return $resource(ServerService.formatURL('module/admin/api/settings/platform'));
    }

})();