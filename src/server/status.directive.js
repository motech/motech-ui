(function () {
    'use strict';

    angular.module('motech-server')
        .directive('motechServerStatus', statusDirective);

    var TRACKED_BUNDLES = [{
            name: 'MOTECH Platform OSGi Web Util',
            id: 'org.motechproject.motech-platform-osgi-web-util'
        },{
            id: 'org.motechproject.motech-platform-config-core',
            name: 'MOTECH Platform Config Core'
        },{
            id: 'org.motechproject.motech-platform-commons-sql',
            name: 'MOTECH Platform Commons SQL'
        },{
            id: 'org.motechproject.motech-platform-event',
            name: 'MOTECH Platform Event'
        },{
            id: 'org.motechproject.motech-platform-dataservices',
            name: 'MOTECH Platform Data Services'
        },{
            id: 'org.motechproject.motech-platform-server-config',
            name: 'MOTECH Platform Server Config'
        },{
            id: 'org.motechproject.motech-platform-email',
            name: 'MOTECH Platform Email'
        }, {
            id: 'org.motechproject.motech-platform-web-security',
            name: 'MOTECH Platform Web Security'
        }, {
            id: 'org.motechproject.motech-platform-server-bundle',    
            name: 'MOTECH Platform Server Bundle'
        }
    ];

    statusDirective.$inject = ['ServerStatusService'];
    function statusDirective(ServerStatusService) {
        return {
            restrict: 'EA',
            replace: true,
            scope:{},
            templateUrl: '/server/status.html',
            link: function (scope, element, attrs) {
                scope.bundles = TRACKED_BUNDLES;
                scope.$watchCollection(function(){
                    return ServerStatusService.errors;
                }, function (errors) {
                    if(errors.length > 0){
                        scope.hasErrors = true;
                        scope.errors = errors;
                    } else {
                        scope.hasErrors = false;
                        scope.errors = [];
                    }
                });
                scope.$watch(function(){
                    return ServerStatusService.running;
                }, function (value) {
                    scope.running = value;
                });
            }
        };
    }

})();